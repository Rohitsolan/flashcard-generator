import { Field, Formik, Form, FieldArray, ErrorMessage } from "formik";
import React, { useState, useRef } from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import { v4 as uuid } from "uuid";
import Validation from "../Components/Validation";
import { TbPlus } from "react-icons/tb";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { addFlashcard } from "../Redux/flashcardSlice";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const [groupImg, setGroupImg] = useState("");
  const fileRef = useRef(null);
  const editRef = useRef(null);
  const uniqueId = uuid();

  const addNewFlashCard = (values, actions) => {
    dispatch(addFlashcard(values));
    actions.resetForm();
    setGroupImg("");
  };

  return (
    <Formik
      // Initial Values
      initialValues={{
        group_id: uniqueId,
        group_name: "",
        group_description: "",
        group_image: null,
        cards: [
          {
            card_id: uuid(),
            card_name: "",
            card_description: "",
            card_image: null
          }
        ]
      }}
      validationSchema={Validation}
      onSubmit={addNewFlashCard}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        // this is form which user can give custom input here.

        <Form className="w-full xl:w-2/3 lg:w-full md:w-full sm:w-full 2xl:ml-52 xl:mx-auto lg:mx-auto md:mx-auto sm:mx-auto items-center space-y-5 text-slate-500 font-medium  ">
          <div className="w-full flex flex-col px-10 py-4 bg-white drop-shadow-lg  rounded-md ">
            <div className=" w-full    xl:w-2/3 lg:w-3/4 md:w-full sm:w-full flex flex-col  sm:flex-row sm:items-center sm:justify-center  xl:space-x-10 lg:space-x-10 md:space-x-10 sm:space-x-10  pt-3">
              <div className=" flex flex-col relative ">
                <h2>
                  Create Group
                  <span className="absolute   ml-1">*</span>
                </h2>
                <Field
                  type="text"
                  name="group_name"
                  className="border-slate-300 p-2 md:w-96 border-2 rounded-md  focus:border-slate-400"
                />
                <ErrorMessage
                  component={"div"}
                  className="text-sm text-red-500 "
                  name="group_name"
                />
              </div>

              <div className="w-full flex flex-col relative ">
                {groupImg ? (
                  <img
                    src={groupImg}
                    alt="groupImg"
                    className="w-28 h-28 object-contain"
                  />
                ) : (
                  <button
                    type="button"
                    title="Upload Image"
                    onClick={() => fileRef.current.click()}
                    className=" w-full flex items-center px-5 lg:px-2 md:px-2 sm:px-2 py-2 mt-6 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2"
                  >
                    <MdOutlineUploadFile className="text-2xl" />
                    <span>Upload Image</span>
                    <input
                      value={groupImg}
                      type="file"
                      ref={fileRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = () => {
                          setFieldValue("group_image", reader.result);
                          setGroupImg(reader.result);
                        };
                      }}
                      hidden
                    />
                  </button>
                )}
                <ErrorMessage
                  component={"div"}
                  className="text-sm text-red-500  "
                  name="group_image"
                />
              </div>
            </div>
            <br />

            <div className="flex flex-col w-full xl:w-full lg:w-full md:w-full sm:w-full ">
              <h2 className="mb-2">Add Description</h2>
              <Field
                as="textarea"
                name="group_description"
                className="resize-none border-slate-300 border-2 placeholder:opacity-40 focus:ring-slate-400  rounded-md"
                rows={3}
                placeholder="Describe the role, responsibility skill required for the job and help candidate to understand the role better."
              />
              <ErrorMessage
                component={"div"}
                className="text-sm text-red-500"
                name="group_description"
              />
            </div>
            <div className="mb-5"></div>
          </div>

          <div className="w-full xl:w-full text-black drop-shadow-lg rounded-lg">
            {/* FieldArray component--> It will create Form for the custom input */}

            <FieldArray name="cards">
              {(fieldArrayFun) => {
                const cards = values.cards;
                return (
                  <>
                    {cards && cards.length > 0
                      ? cards.map((card, index) => (
                          <div
                            className="flex items-center justify-start   space-x-10 bg-white px-5 lg:px-10 py-4"
                            key={index}
                          >
                            <div className="p-1 h-6 w-6  rounded-full flex items-center justify-center bg-red-600 text-white text-md font-semibold ">
                              {index + 1}
                            </div>
                            <div className="flex flex-col space-y-3 md:space-x-10 md:flex-row">
                              <div className="relative flex flex-col justify-center ">
                                <h2 className="">
                                  Enter Term
                                  <span className="absolute   ml-1">*</span>
                                </h2>
                                <Field
                                  type="text"
                                  name={`cards.${index}.card_name`}
                                  innerRef={editRef}
                                  className="border-slate-300 p-2  border-2 rounded-md  focus:border-slate-400"
                                />

                                <ErrorMessage
                                  component={"div"}
                                  className="text-sm text-red-500"
                                  name={`cards.${index}.card_name`}
                                />
                              </div>
                              <div className="relative flex flex-col justify-center ">
                                <h2 className="">
                                  Enter Defination
                                  <span className="absolute  ml-1 ">*</span>
                                </h2>
                                <Field
                                  as="textarea"
                                  name={`cards.${index}.card_description`}
                                  className="border-slate-300 p-2  border-2 rounded-md focus:border-slate-400 resize-none "
                                />

                                <ErrorMessage
                                  component={"div"}
                                  className="text-sm text-red-500"
                                  name={`cards.${index}.card_description`}
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  className=" w-[15rem] lg:flex lg:items-center lg:w-[19rem] md:w-[19rem] sm:w-[19rem] px-2 py-2 bg-white border-2  border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2"
                                  title="Select Image"
                                >
                                  <span className="ml-4">Select Image</span>
                                </button>

                                <div className="flex items-center justify-around w-full md:flex-col md:space-y-5 md:mt-5">
                                  <button
                                    type="button"
                                    title="Delete"
                                    onClick={() => fieldArrayFun.remove(index)}
                                  >
                                    <TrashIcon className="h-6 text-slate-500" />
                                  </button>
                                  <button
                                    type="button"
                                    title="Edit Term"
                                    onClick={() => editRef.current.focus()}
                                  >
                                    <PencilAltIcon className="h-6 text-blue-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                    <div className="w-full  bg-white mb-5 px-5 py-2 ">
                      <button
                        // className="border-2 border-black"
                        type="button"
                        onClick={() =>
                          fieldArrayFun.push({
                            card_id: uuid(),
                            card_name: "",
                            card_description: "",
                            card_image: null
                          })
                        }
                        title="Add More"
                        className="  flex items-center  text-blue-600 font-medium text-sm  "
                      >
                        <TbPlus className="text-xl" />
                        <span>Add More</span>
                      </button>
                    </div>
                    <div className="flex justify-center w-full">
                      <button
                        disabled={isSubmitting}
                        title="Create"
                        type="submit"
                        className="py-2 px-14 mb-10  bg-red-600 text-white rounded-md"
                      >
                        Create
                      </button>
                    </div>
                  </>
                );
              }}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
