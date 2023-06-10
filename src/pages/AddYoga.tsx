import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import FormRow from "../components/FormRow";
import { CreateYogaRequest } from "../models/yogaList.interface";
import { createYoga } from "../features/yoga/yogaSlice";
import { useNavigate } from "react-router";


const initialState: CreateYogaRequest = {
  title: "",
  details: "",
  youtubeId: "",
};

const AddYoga = () => {
  const [request, setRequest] = useState<CreateYogaRequest>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const inputValue = e.target.value;
    setRequest({ ...request, [name]: inputValue });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (request) {
      await dispatch(createYoga(request));
      navigate('/yoga')

    }
  };

  return (
    <form action="" onSubmit={handleSubmit} className="mx-16 mt-28">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Add the new Yoga type
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-1">
          <FormRow
            type="text"
            name="title"
            value={request.title}
            handleChange={handleInput}
          ></FormRow>

          <FormRow
            type="text"
            name="details"
            value={request.details}
            handleChange={handleInput}
          ></FormRow>

          <FormRow
            type="text"
            name="youtubeId"
            value={request.youtubeId}
            handleChange={handleInput}
          ></FormRow>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Add
      </button>
    </form>
  );
};

export default AddYoga;
