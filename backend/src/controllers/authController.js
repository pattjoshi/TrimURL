import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModel.create({
      name,
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
      verifyOtp: "",
      verifyOtpExpaire: 0,
      isVerified: false,
      resetOtp: "",
      resetOtpExpaire: "",
      profileImage: "",
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Set cookie with proper options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    });

    // Send welcome email
    try {
      const mailOptions = {
        from: {
          name: "TrimURL",
          address: process.env.SENDR_EMAIL,
        },
        to: email,
        subject: "Welcome to TrimURL",
        html: `
          <h1>Welcome to TrimURL!</h1>
          <p>Your TrimURL account has been successfully created.</p>
          <p>Registered email: ${email}</p>
          <p>If you did not create this account, please contact support immediately.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Continue registration process even if email fails
    }

    // Remove password from response
    user.password = undefined;

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // After successful login validation
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Set cookie with proper options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Changed from 'strict'
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // Remove password from response
    user.password = undefined;

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0, // This will make the cookie expire immediately
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// send Verification OPT to the user's Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user and validate existence
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified",
      });
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = Date.now() + 5 * 60 * 60 * 1000; // 5 hours

    // Update user with new OTP details
    user.verifyOtp = otp;
    user.verifyOtpExpaire = otpExpiry;
    await user.save();

    // Email template
    const mailOptions = {
      from: {
        name: "TrimURL",
        address: process.env.SENDR_EMAIL,
      },
      to: user.email,
      subject: "Your TrimURL Email Verification OTP",
      html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4A90E2; text-align: center; margin-bottom: 24px;">Welcome to TrimURL!</h2>

      <div style="background-color: #f4f6f8; padding: 24px; border-radius: 6px; box-shadow: inset 0 0 5px rgba(0,0,0,0.03);">
        <p style="font-size: 16px; color: #333; margin-bottom: 12px;">Thank you for signing up!</p>
        <p style="font-size: 16px; color: #333; margin-bottom: 12px;">Your email verification code is:</p>

        <p style="font-size: 28px; font-weight: bold; color: #2c3e50; text-align: center; background-color: #e9eff5; padding: 14px 20px; border-radius: 6px; margin: 20px 0;">
          ${otp}
        </p>

        <p style="font-size: 14px; color: #555; margin-bottom: 8px;">This code will expire in <strong>5 hours</strong>.</p>
        <p style="font-size: 12px; color: #888; line-height: 1.5;">If you didn't request this verification code, you can safely ignore this message.</p>
      </div>

      <p style="color: #999; text-align: center; margin-top: 30px; font-size: 14px;">
        Best regards,<br/><strong>The TrimURL Team</strong>
      </p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />

      <div style="text-align: center; font-size: 14px; color: #666;">
        <p>🔗 Connect with the developer:</p>
        <p style="margin: 8px 0;">
          <a href="https://www.linkedin.com/in/om-prakash-pattjoshi-/" style="color: #4A90E2; text-decoration: none; margin: 0 8px;">💼 LinkedIn</a> |
          <a href="https://github.com/pattjoshi" style="color: #4A90E2; text-decoration: none; margin: 0 8px;">🐱 GitHub</a> |
          <a href="https://portfoliodevom.netlify.app/" style="color: #4A90E2; text-decoration: none; margin: 0 8px;">🌐 Portfolio</a>
        </p>
      </div>
    </div>
  `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent successfully",
    });
  } catch (error) {
    console.error("Error in sendVerifyOtp:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// verify the Email using the OTP
export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.userId;

    // Find user
    const user = await userModel.findById(userId);

    console.log({
      receivedOtp: otp,
      storedOtp: user?.verifyOtp,
      otpMatch: user?.verifyOtp === otp,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Validate OTP
    if (user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check OTP expiration
    if (Date.now() > user.verifyOtpExpaire) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Update user verification status
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpaire = 0;
    await user.save();

    // Send confirmation email
    try {
      const mailOptions = {
        from: {
          name: "TrimURL",
          address: process.env.SENDR_EMAIL,
        },
        to: user.email,
        subject: "Email Verification Successful",
        html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4A90E2; text-align: center; margin-bottom: 24px;">Email Verified Successfully!</h2>

      <div style="background-color: #f4f6f8; padding: 24px; border-radius: 6px; box-shadow: inset 0 0 5px rgba(0,0,0,0.03);">
        <p style="font-size: 16px; color: #333; margin-bottom: 12px;">Your email address has been successfully verified.</p>
        <p style="font-size: 16px; color: #333; margin-bottom: 12px;">You can now access all features of <strong>TrimURL</strong>.</p>
        <p style="font-size: 16px; color: #333;">Thank you for choosing TrimURL!</p>
      </div>

      <p style="color: #999; text-align: center; margin-top: 30px; font-size: 14px;">
        Best regards,<br/><strong>The TrimURL Team</strong>
      </p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />

      <div style="text-align: center; font-size: 14px; color: #666;">
        <p>🔗 Connect with the developer:</p>
        <p style="margin: 8px 0;">
          <a href="https://www.linkedin.com/in/om-prakash-pattjoshi-/" style="color: #4A90E2; text-decoration: none; margin: 0 8px;">💼 LinkedIn</a> |
          <a href="https://github.com/pattjoshi" style="color: #4A90E2; text-decoration: none; margin: 0 8px;">🐱 GitHub</a> |
          <a href="https://portfoliodevom.netlify.app/" style="color: #4A90E2; text-decoration: none; margin: 0 8px;">🌐 Portfolio</a>
        </p>
      </div>
    </div>
  `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue with verification process even if confirmation email fails
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// is Authandticated

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User is authenticated",
    });
  } catch (error) {
    console.error("Authentication check error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Generate OTP
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetOtpExpiry = Date.now() + 15 * 60 * 1000; // 15 min

    // Update user with reset OTP details
    user.resetOtp = resetOtp;
    user.resetOtpExpaire = resetOtpExpiry;
    await user.save();

    // Send reset OTP email
    const mailOptions = {
      from: {
        name: "TrimURL",
        address: process.env.SENDR_EMAIL,
      },
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4A90E2; text-align: center; margin-bottom: 24px;">Password Reset Request</h2>
          
          <div style="background-color: #f4f6f8; padding: 24px; border-radius: 6px; box-shadow: inset 0 0 5px rgba(0,0,0,0.03);">
            <p style="font-size: 16px; color: #333; margin-bottom: 12px;">Your password reset OTP is:</p>
            <h3 style="text-align: center; font-size: 24px; color: #4A90E2; letter-spacing: 2px; margin: 20px 0;">${resetOtp}</h3>
            <p style="font-size: 14px; color: #666;">This OTP will expire in 15 Minute.</p>
            <p style="font-size: 14px; color: #666;">If you didn't request this reset, please ignore this email.</p>
          </div>

          <p style="color: #999; text-align: center; margin-top: 30px; font-size: 14px;">
            Best regards,<br/>
            <strong>The TrimURL Team</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Reset OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("Error in sendResetOtp:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Reset User Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate required fields
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate OTP
    if (user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check OTP expiration
    if (Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset OTP fields
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    // Send password change confirmation email
    const mailOptions = {
      from: {
        name: "TrimURL",
        address: process.env.SENDR_EMAIL,
      },
      to: email,
      subject: "Password Reset Successful",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4A90E2; text-align: center; margin-bottom: 24px;">Password Reset Successful</h2>
          
          <div style="background-color: #f4f6f8; padding: 24px; border-radius: 6px;">
            <p style="font-size: 16px; color: #333;">Your password has been successfully reset.</p>
            <p style="font-size: 14px; color: #666;">If you didn't make this change, please contact support immediately.</p>
          </div>

          <p style="color: #999; text-align: center; margin-top: 30px; font-size: 14px;">
            Best regards,<br/>
            <strong>The TrimURL Team</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
