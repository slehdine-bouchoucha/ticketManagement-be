const LoginController = require("../Controllers/AuthControllers/LoginController");
const User = require("../Modals/UserModal");
const { verifyPassword, generateToken } = require("../Utils/AuthUtils");
const { verifyOTP } = require("../Utils/otpUtils");

jest.mock("../Modals/UserModal");
jest.mock("../Utils/AuthUtils");
jest.mock("../Utils/otpUtils");

describe("Login Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
        otp: "123456",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error if email or password is missing", async () => {
    delete req.body.email;

    await LoginController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      code: 401,
      message: "Please Fill all the fields",
    });
  });

  it("should return user and token on successful login", async () => {
    User.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedpassword",
      isFirstTime: false,
      base32: "userOTP",
    });

    verifyPassword.mockResolvedValue(true);
    verifyOTP.mockReturnValue(true);
    generateToken.mockResolvedValue("generatedToken");

    await LoginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: expect.objectContaining({ email: "test@example.com" }),
      token: "generatedToken",
    });
  });
});
