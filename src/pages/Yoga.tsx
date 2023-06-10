import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getYogaList } from "../features/yoga/yogaSlice";
import { FilterRequest } from "../models/yogaList.interface";
import { YogaItem } from "../components/YogaItem";

const initialState: FilterRequest = {
  query: "",
  order: "",
};

const sortOptions = [
  { key: "default", text: "Default" },
  { key: "asc", text: "A-Z" },
  { key: "desc", text: "Z-A" },
];

const Yoga = () => {
  const [filter, setFilter] = useState<FilterRequest>(initialState);
  const { yogaList } = useAppSelector((store) => store.yogaSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getYogaList(filter));
  }, [dispatch, filter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getYogaList(filter));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedFilter = {
      ...filter,
      order: sortOptions[e.target.selectedIndex].key,
    };
    setFilter(updatedFilter);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <form action="" onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              name="query"
              id="name"
              className="mr-4 block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
              onChange={handleChange}
            />
            <div className="flex items-center">
              <label
                htmlFor="location"
                className="pr-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Sort
              </label>
              <select
                id="order"
                name="order"
                className="mt-2 w-32 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Default"
                onChange={handleOrderChange}
              >
                {sortOptions.map((item) => (
                  <option key={item.key}>{item.text}</option>
                ))}
              </select>
            </div>
          </form>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-6">
            Yoga Types
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn the differences yoga types
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {yogaList?.map((item) => (
              <YogaItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
