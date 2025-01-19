import { useState } from "react";
import { useFetch } from "../api/useFetch";
import useMutation from "../api/useMutation";
import { Button } from "../components/Button/Button";

import { Modal } from "../components/Modal/Modal";
import TodoCard from "../components/Todo/TodoCard";
import TodoForm from "../forms/TodoForm/TodoForm";
import DropDown from "../components/Dropdown.tsx/DropDown";
import Pagination from "../components/Pagination/Pagination";
const statusDropdownOptions = [
  { value: null, label: "select all" },
  { value: "todo", label: "To Do" },
  { value: "inProgress", label: "In Progress" },
  { value: "done", label: "Done" },
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
  const perPage = 5;
  const { mutation: deleteMutation } = useMutation();
  const { data: todoData, mutate: mutateTodo } = useFetch("todo", "filter", {
    _page: pageNo,
    _per_page: perPage,
    ...(selectedStatus.value ? { status: selectedStatus.value } : {}),
    ...(selectedUser.id ? { assignedUser: selectedUser.id } : {}),
  });
  const handleDelete = async () => {
    if (mode !== "delete") {
      return;
    }
    try {
      const { results } = await deleteMutation("todo", "delete", selectedtodo, {
        method: "DELETE",
      });
      mutateTodo();
      setOpenDelete(false);
    } catch (err) {}
  };
  console.log(usersData, todoData, "sad");
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-center gap-3">
          <input
            className="px-4 py-2 self-center my-4"
            placeholder="search todo"
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
              {selectedUser?.name || "Select an user"}
            </DropDown.Button>
            <DropDown.Menu>
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
        </div>
        <Button className="self-end" onClick={() => setOpenModal(true)}>
          Add todo
        </Button>

        <div className="grid grid-cols-3 p-10 gap-4 flex-1 overflow-y-scroll">
          {todoData?.data?.map((dta) => {
            return (
              <TodoCard
                {...dta}
                assignedUser={
                  usersData?.find?.((val) => val.id == dta.assignedUser)?.[
                    "name"
                  ]
                }
                setSelectedtodo={setSelectedtodo}
                handleModal={setOpenModal}
                setMode={setMode}
                handleDeleteModal={setOpenDelete}
              />
            );
          })}
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
          <Button onClick={handleDelete}>yes Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
