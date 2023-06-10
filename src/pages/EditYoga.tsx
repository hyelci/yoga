import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { YogaBlog } from "../models/yogaList.interface";
import { useNavigate, useParams } from "react-router";
import { editYoga, getYogaDetails } from "../features/yoga/yogaSlice";
import FormRow from "../components/FormRow";

const EditYoga = () => {
  const { yogaDetails } = useAppSelector((store) => store.yogaSlice);
  const [value, setValue] = useState<YogaBlog | undefined>(yogaDetails);
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getYogaDetails(parseInt(id!)));
  }, [id, dispatch]);

  useEffect(() => {
    setValue(yogaDetails);
  }, [yogaDetails]);

  const handleYogaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const inputValue = e.target.value;
    setValue({ ...value, [name]: inputValue } as YogaBlog);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      await dispatch(editYoga(value));
      navigate("/yoga");
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="mx-14 mt-24">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-1">
            <h2 className="my-4 font-semibold">Edit the Yoga Type</h2>

            <FormRow
              type="text"
              name="title"
              value={value?.title!}
              handleChange={handleYogaInput}
            />

            <FormRow
              type="text"
              name="details"
              value={value?.details!}
              handleChange={handleYogaInput}
            />

            <FormRow
              type="text"
              name="youtubeId"
              value={value?.youtubeId!}
              handleChange={handleYogaInput}
            />

            <button
              type="submit"
              className="mt-5 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditYoga;
