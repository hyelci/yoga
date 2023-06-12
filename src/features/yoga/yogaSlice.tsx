import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateYogaRequest,
  FilterRequest,
  YogaBlog,
} from "../../models/yogaList.interface";
import axios from "axios";
import toast from "react-hot-toast";

export interface YogaSliceType {
  yogaListLoading: boolean;
  yogaListError: boolean;
  yogaList?: YogaBlog[];
  yogaDetailsLoading: boolean;
  yogaDetailsError: boolean;
  yogaDetails?: YogaBlog;
  isEditing: boolean;
  yogaLoading: boolean;
  yogaError: boolean;
  selectedYoga?: YogaBlog;
  search?: string;
}

const initialState: YogaSliceType = {
  yogaListLoading: false,
  yogaListError: false,
  yogaList: [],
  yogaDetailsLoading: false,
  yogaDetailsError: false,
  isEditing: false,
  yogaLoading: false,
  yogaError: false,
  search: undefined,
};

export const getYogaList = createAsyncThunk(
  "list/getList",
  async (filter: FilterRequest, thunkAPI: any) => {
    let URL = `http://localhost:8000/api/yoga?q=${filter.query}&_sort=title&_order=${filter.order}`;
    try {
      const resp = await axios.get(URL);
      return resp.data.data;
    } catch (error) {
      console.error("There is no list");
      throw error;
    }
  }
);

export const getYogaDetails = createAsyncThunk(
  "yoga/getYogaDetails",
  async (id: number, thunkAPI: any) => {
    let URL = `http://localhost:8000/api/yoga/${id}`;
    try {
      const resp = await axios.get(URL);
      return resp.data.data;
    } catch (error) {
      console.error("There is no yoga details");
      throw error;
    }
  }
);

export const deleteYoga = createAsyncThunk(
  "yoga/deleteYoga",
  async (id: number, thunkAPI: any) => {
    let URL = `http://localhost:8000/api/yoga/${id}`;
    try {
      const resp = await axios.delete(URL);
      return resp.data.data;
    } catch (error) {
      console.error("There is no yoga delete details");
      throw error;
    }
  }
);

export const createYoga = createAsyncThunk(
  "yoga/addYoga",
  async (request: CreateYogaRequest, thunkAPI: any) => {
    let URL = `http://localhost:8000/api/yoga`;
    try {
      const resp = await axios.post(URL, request);
      return resp.data.data;
    } catch (error) {
      console.error("There is no yoga create details");
      throw error;
    }
  }
);

export const editYoga = createAsyncThunk(
  "yoga/editYoga",
  async (value: YogaBlog, thunkAPI: any) => {
    let URL = `http://localhost:8000/api/yoga/${value.id}`;
    try {
      const resp = await axios.patch(URL, value);
      return resp.data.data;
    } catch (error) {
      console.error("There is no yoga edit details");
      throw error;
    }
  }
);

export const yogaSlice = createSlice({
  name: "yoga",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getYogaList.pending, (state) => {
        state.yogaListLoading = true;
      })
      .addCase(getYogaList.fulfilled, (state, { payload }) => {
        state.yogaListLoading = false;
        state.yogaList = payload;
        state.yogaListError = false;
      })
      .addCase(getYogaList.rejected, (state, { payload }) => {
        state.yogaListLoading = false;
        state.yogaListError = true;
      })

      .addCase(getYogaDetails.pending, (state) => {
        state.yogaDetailsLoading = true;
      })
      .addCase(getYogaDetails.fulfilled, (state, { payload }) => {
        state.yogaDetailsLoading = false;
        state.yogaDetails = payload;
        state.yogaDetailsError = false;
      })
      .addCase(getYogaDetails.rejected, (state, { payload }) => {
        state.yogaDetailsLoading = false;
        state.yogaDetailsError = true;
      })

      .addCase(createYoga.pending, (state) => {
        state.yogaLoading = true;
      })
      .addCase(createYoga.fulfilled, (state, { payload }) => {
        state.yogaLoading = false;
        state.yogaError = false;
        toast.success("The yoga type added successfuly");
      })
      .addCase(createYoga.rejected, (state, { payload }) => {
        state.yogaLoading = false;
      })

      .addCase(editYoga.pending, (state) => {
        state.yogaLoading = true;
      })
      .addCase(editYoga.fulfilled, (state) => {
        state.yogaLoading = false;
        state.yogaError = false;
        toast.success("The yoga type edited successfully!");
      })
      .addCase(editYoga.rejected, (state, { payload }) => {
        state.yogaLoading = false;
        state.yogaError = true;
      })

      .addCase(deleteYoga.pending, (state) => {
        state.yogaLoading = true;
      })
      .addCase(deleteYoga.fulfilled, (state) => {
        state.yogaLoading = false;
        state.yogaError = false;
        toast.success("The yoga type deleted successfully!");
      })
      .addCase(deleteYoga.rejected, (state, { payload }) => {
        state.yogaLoading = false;
        state.yogaError = true;
      });
  },
});

// export const {} = yogaSlice.actions;
export default yogaSlice.reducer;
