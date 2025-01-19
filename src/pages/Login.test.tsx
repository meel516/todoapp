import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "./Login";

import { expect } from "chai";
import { useAuth } from "../contexts/AuthContext";



vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../api/apiClient", () => ({
  get: vi.fn(),
}));

describe("LoginForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    useAuth.mockReturnValue({
      login: vi.fn(),
    });
  });

  it("renders the LoginForm correctly", () => {
    render(<Login />);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("password")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    render(<Login />);

    
    const submitButton = screen.getByText("submit");
    fireEvent.click(submitButton);

   
    await waitFor(() => {
      expect(screen.getByText("username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });



  it("disables the submit button when the form is invalid and enables it after fields are valid", async () => {
    render(<Login />);
  
    const submitButton = screen.getByText("submit");
  
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  
  
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "testPassword" },
    });
  
    
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

});
