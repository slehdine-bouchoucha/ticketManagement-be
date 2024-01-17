const RegisterController = require("../Controllers/AuthControllers/RegisterController");
const User = require("../Modals/UserModal");

describe("RegisterController", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        userName: "testUser",
        fullName: "Test User",
        email: "test@example.com",
        password: "password123",
      },
    };
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("registers a new user when provided with valid data", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue({
      userName: "testUser",
      fullName: "Test User",
      email: "test@example.com",
    });

    await RegisterController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      user: expect.objectContaining({
        userName: "testUser",
        fullName: "Test User",
        email: "test@example.com",
      }),
    });
  });

  it("handles registration failure for a duplicate email", async () => {
    const existingUser = {
      userName: "existingUser",
      fullName: "Existing User",
      email: "test@example.com",
    };

    User.findOne = jest.fn().mockResolvedValue(existingUser);

    await RegisterController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 401,
      message: "Email is already taken",
    });
  });

  it("handles registration failure for missing fields", async () => {
    const incompleteRequest = {
      body: {
        userName: "testUser",
      },
    };

    await RegisterController(incompleteRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 500,
      message: "Please Fill all the fields",
    });
  });
});
