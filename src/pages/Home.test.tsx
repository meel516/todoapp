import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Home from "./Home.tsx";
import { useFetch } from "../api/useFetch.ts";
import useMutation from "../api/useMutation.ts";

vi.mock("../api/useFetch");
vi.mock("../api/useMutation");

const mockTodos = [
  { id: 1, title: "First Todo", status: "todo", assigned: 1 },
  { id: 2, title: "Second Todo", status: "inProgress", assigned: 2 },
];

const mockUsers =  [
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "2",
    "name": "Jean Doe",
    "email": "jean@example.com"
  },
  {
    "id": "3",
    "name": "Bean Doe",
    "email": "bean@example.com"
  },
  {
    "id": "4",
    "name": "Dean Doe",
    "email": "dean@example.com"
  },
  {
    "id": "5",
    "name": "Dan Doe",
    "email": "dan@example.com"
  },
  {
    "id": "6",
    "name": "Sam Smith",
    "email": "sam@example.com"
  },
  {
    "id": "7",
    "name": "James Taylor",
    "email": "james@example.com"
  },
  {
    "id": "8",
    "name": "Alice Brown",
    "email": "alice@example.com"
  },
  {
    "id": "9",
    "name": "Emma Wilson",
    "email": "emma@example.com"
  },
  {
    "id": "10",
    "name": "Oliver Harris",
    "email": "oliver@example.com"
  }
]

describe("Home Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock useFetch hook
    useFetch.mockImplementation((endpoint) => {
      if (endpoint.includes("users")) {
        return { data: mockUsers, isLoading: false };
      }
      if (endpoint.includes("todo")) {
        return { data: { mockTodos}, isLoading: false, mutate: vi.fn() };
      }
    });

    // Mock useMutation hook
    useMutation.mockReturnValue({ mutation: vi.fn() });
  });

  it("renders the Home component", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText("Search Todo")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  // it("filters todos by search term", async () => {
  //   render(<Home />);
  //   const searchInput = screen.getByPlaceholderText("Search Todo");

  //   fireEvent.change(searchInput, { target: { value: "First" } });

  //   await waitFor(() => {
  //     expect(screen.getByText("First Todo")).toBeInTheDocument();
  //   });

  //   expect(screen.queryByText("Second Todo")).not.toBeInTheDocument();
  // });

  it("selects a status from the dropdown", async () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Select an option"));
    fireEvent.click(screen.getByText("To Do"));

    await waitFor(() => {
      expect(screen.getByText("To Do")).toBeInTheDocument();
    });
  });

  it("opens the Add Todo modal and validates the form", async () => {
    render(<Home />);

    // Open Add Todo modal
    const addButton = screen.getByText("Add Todo");
    fireEvent.click(addButton);

    // Get submit button to trigger validation
    const submitButton = screen.getByText("Submit");

    // Submit the form without filling out required fields
    fireEvent.click(submitButton);

    // Use findByText for waiting for the validation errors to appear
    const assignUserError = await screen.findByText("Assigned User is required");
    const titleError = await screen.findByText("Title is required");
    const priorityError = await screen.findByText("Priority is required");
    const descriptionError = await screen.findByText("Description is required");

    // Check if validation errors appear for required fields
    expect(assignUserError).toBeInTheDocument();
    expect(titleError).toBeInTheDocument();
   
    expect(priorityError).toBeInTheDocument();
    expect(descriptionError).toBeInTheDocument();
  });
  // it("calls delete mutation on delete confirmation", async () => {
  //   const mockDelete = vi.fn();
  //   useMutation.mockReturnValue({ mutation: mockDelete });

  //   render(<Home />);

  //   fireEvent.click(screen.getByText("Delete this Todo?"));
  //   fireEvent.click(screen.getByText("Yes, Delete"));

  //   await waitFor(() => {
  //     expect(mockDelete).toHaveBeenCalled();
  //   });
  // });

//  it("renders filtered todos based on selected status", async () => {
//      render(<Home />);

//     fireEvent.click(screen.getByText("Select an option"));
//     fireEvent.click(screen.getByText("To Do"));

//     await waitFor(() => {
//       expect(screen.getByText("First Todo")).toBeInTheDocument();
//     });
//   });

  it("renders all users in the user dropdown", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Select a User"));

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  // it("handles pagination controls", async () => {
  //   const mockMutate = vi.fn();
  //   useFetch.mockImplementation((endpoint) => {
  //     if (endpoint === "todo") {
  //       return { data: { data: mockTodos, pages: 2, next: true, prev: false }, mutate: mockMutate };
  //     }
  //   });

  //   render(<Home />);

  //   fireEvent.click(screen.getByText("Next"));

  //   await waitFor(() => {
  //     expect(mockMutate).toHaveBeenCalled();
  //   });
  // });
});
