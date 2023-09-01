import * as Yup from "yup";

const Validation = Yup.object().shape({
  group_id: Yup.string(),
  group_name: Yup.string()
    .max(30, "group name must be less then 30 character")
    .required("Please Enter Group Name"),
  group_description: Yup.string()
    .min(10, "Group description must be more than 10 character ")
    .max(100, "Group description must be less than 100 character ")
    .required("Please enter description"),
  group_image: Yup.mixed().required("please upload Image."),

  cards: Yup.array().of(
    Yup.object().shape({
      card_id: Yup.string(),
      card_name: Yup.string()
        .max(20, "Term must be 20 character")
        .required("please enter term"),
      card_description: Yup.string()
        .min(20, "Defination must be more than 20 character")
        .max(500, "Defination must be less than 500 character")
        .required("please enter defination"),
    })
  ),
});
export default Validation;
