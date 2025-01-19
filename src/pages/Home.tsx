import { useState, useEffect, useMemo } from "react";
import { useFetch } from "../api/useFetch";
import useMutation from "../api/useMutation";
import { Button } from "../components/Button/Button";
import { Modal } from "../components/Modal/Modal";
import TodoCard from "../components/Todo/TodoCard";
import TodoForm from "../forms/TodoForm/TodoForm";
import DropDown from "../components/Dropdown.tsx/DropDown";
import Pagination from "../components/Pagination/Pagination";

const statusDropdownOptions = [
  { value: null, label: "Select All" },
  { value: "todo", label: "To Do" },
  { value: "inProgress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const sortOptions = [
  { value: null, label: "Select Sort" },
  { value: "title", label: "Title" },
  { value: "dueDate", label: "Due Date" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
];

const Home = () => {
  const { data: usersData, isLoading: userDataLoading } = useFetch(
    "users",
    "getAll"
  );
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedtodo, setSelectedtodo] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedStatus, SetselectedStatus] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [selectedSort, setSelectedSort] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const perPage = 5;

  const { mutation: deleteMutation } = useMutation();
  const { data: todoData, mutate: mutateTodo } = useFetch("todo", "filter", {
    _page: pageNo,
    _per_page: perPage,
    ...(selectedStatus.value ? { status: selectedStatus.value } : {}),
    ...(selectedUser.id ? { assignedUser: selectedUser.id } : {}),
    ...(selectedSort.value ? { _sort: selectedSort.value, _order: "asc" } : {}),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  useEffect(() => {
    setPageNo(1);
  }, [selectedSort, selectedUser, selectedStatus, debouncedSearch]);

  const filteredTodos = useMemo(() => {
    return todoData?.data?.filter((todo) =>
      todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, todoData]);

  const handleDelete = async () => {
    if (mode !== "delete") return;
    try {
      await deleteMutation("todo", "delete", selectedtodo, {
        method: "DELETE",
      });
      mutateTodo();
      setOpenDelete(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-center gap-3">
          <input
            className="px-4 py-2 self-center my-4"
            placeholder="Search Todo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <DropDown>
            <DropDown.Button>
              {selectedStatus.label || "Select an option"}
            </DropDown.Button>
            <DropDown.Menu>
              {statusDropdownOptions.map((option) => (
                <DropDown.Item
                  key={option.value}
                  onClick={() => SetselectedStatus(option)}
                >
                  {option.label}
                </DropDown.Item>
              ))}
            </DropDown.Menu>
          </DropDown>

          <DropDown>
            <DropDown.Button>
              {selectedUser?.name || "Select a User"}
            </DropDown.Button>
            <DropDown.Menu>
              <DropDown.Item
                key={"default"}
                onClick={() => setSelectedUser({})}
              >
                All Users
              </DropDown.Item>
              {usersData?.map((option) => (
                <DropDown.Item
                  key={option.id}
                  onClick={() => setSelectedUser(option)}
                >
                  {option?.name}
                </DropDown.Item>
              ))}
            </DropDown.Menu>
          </DropDown>

          <DropDown>
            <DropDown.Button>
              {selectedSort?.label || "Sort by"}
            </DropDown.Button>
            <DropDown.Menu>
              {sortOptions.map((option) => (
                <DropDown.Item
                  key={option.value}
                  onClick={() => setSelectedSort(option)}
                >
                  {option.label}
                </DropDown.Item>
              ))}
            </DropDown.Menu>
          </DropDown>
        </div>

        <Button className="self-end" onClick={() => setOpenModal(true)}>
          Add Todo
        </Button>

        <div className="grid grid-cols-3 p-10 gap-4 flex-1 overflow-y-scroll">
          {filteredTodos?.map((dta) => (
            <TodoCard
              key={dta.id}
              {...dta}
              assignedUser={
                usersData?.find?.((val) => val.id === dta.assignedUser)?.name
              }
              setSelectedtodo={setSelectedtodo}
              handleModal={setOpenModal}
              setMode={setMode}
              handleDeleteModal={setOpenDelete}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Pagination
            totalCount={todoData?.pages}
            hasNex={todoData?.next}
            hasPrev={todoData?.prev}
            setPageNumber={setPageNo}
            pageNo={pageNo}
            perPage={perPage}
          />
        </div>
      </div>

      <Modal
        className="w-[600px] p-5"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <TodoForm
          mode={mode}
          mutateTodo={mutateTodo}
          selectedtodo={selectedtodo}
          handleCloseModal={setOpenModal}
          usersData={usersData}
        />
      </Modal>

      <Modal
        className="p-10"
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <div className="flex flex-col justify-around min-h-[200px] text-center">
          <div className="text-4xl self-center">Delete this Todo?</div>
          <Button onClick={handleDelete}>Yes, Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
