import { Field, Formik } from "formik";
import { Button, Form, FormField } from "semantic-ui-react";
import {
  ActivityPagingItem,
  CreateOrEditActivity,
} from "../../../types/activity.type";

type Props = {
  activity?: ActivityPagingItem;
};

type FieldNameType = {
  [key in keyof CreateOrEditActivity]: key;
};
const FieldName: FieldNameType = {
  id: "id",
  title: "title",
  category: "category",
  city: "city",
  venue: "venue",
  date: "date",
  description: "description",
} as const;

const NewCreateOrEdit = ({ activity: editActivity }: Props) => {
  const isEditMode = !!editActivity;
  const initialValues = isEditMode
    ? ({
        ...editActivity,
        description: "",
      } as CreateOrEditActivity)
    : ({} as CreateOrEditActivity);
  const title = isEditMode ? "Edit Activity" : "Create New Activity";

  const primaryButtonText = isEditMode ? "Update" : "Create";

  const onSubmitForm = () => {
    console.log("submit form");
  };

  return (
    <div>
      <h1>{title}</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmitForm}>
        <Form>
          <div className="float-right">
            <Button primary type="submit">
              {primaryButtonText}
            </Button>
            <Button secondary>Cancel</Button>
          </div>
          <FormField>
            <label>Title</label>
            <Field name={FieldName.title} placeholder="Title" />
          </FormField>
          <FormField>
            <label>Description</label>
            <Field name={FieldName.description} placeholder="Description" />
          </FormField>
          <FormField>
            <label>Category</label>
            <Field name={FieldName.category} placeholder="Category" />
          </FormField>
          <FormField>
            <label>City</label>
            <Field name={FieldName.city} placeholder="City" />
          </FormField>
          <FormField>
            <label>Venue</label>
            <Field name={FieldName.venue} placeholder="Venue" />
          </FormField>
        </Form>
      </Formik>
    </div>
  );
};

export default NewCreateOrEdit;
