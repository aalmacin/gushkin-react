import React, { useState } from "react";
import classes from "./ActivityForm.module.scss";
import { MICRO_AMOUNT } from "functions/global.constants";
import Button, { ButtonType } from "components/Button";
import TextField from "components/TextField";
import NumberField from "components/NumberField";
import FormClose from "pages/main/components/formClose";
import Loading from "components/Loading";
import ErrorList from "pages/error";
import { useToast } from "components/Toast/useToast";
import useCreateActivity from "pages/main/activities/graphql/useCreateActivity";
import { ActivityItem } from "../graphql/Activity.local";

interface ActivityFormProps {
  closeHandler: () => void;
}

type ActivityForm = Omit<ActivityItem, "actions" | "id" | "fundAmtDisplay">;

const ActivityForm: React.FC<ActivityFormProps> = ({ closeHandler }) => {
  // const { refetch } = useGetActivities();

  const { showToast } = useToast();

  const { createActivity } = useCreateActivity({
    onCompleted: () => {
      closeHandler();
      showToast("Successfully created Activity", 3000);
    }
  });

  const initialFormState = {
    description: "",
    fundAmt: 0,
    positive: true,
  };
  const [activity, setActivity] = useState<ActivityForm>(initialFormState);

  const [errors, setErrors] = useState<string[]>([]);

  // TODO: Replace with real
  const isActivitiesActionLoading = false;

  const getErrors = () => {
    const errorList = [];

    if (!activity.description) {
      errorList.push("Description is required.");
    }

    if (!activity.fundAmt) {
      errorList.push("Price is required.");
    }

    return errorList;
  };

  const updateFormControl = (key: "description" | "fundAmt") => (
    event: any
  ) => {
    setActivity({
      ...activity,
      [key]: event.target.value,
    });
    setErrors(getErrors());
  };

  const updatePositive = () => {
    setActivity({
      ...activity,
      positive: !activity.positive,
    });
    setErrors(getErrors());
  };

  const submitFormHandler = () => {
    const errorList = getErrors();
    setErrors(errorList);

    if (errorList.length === 0) {
      const fundAmt = parseFloat(`${activity.fundAmt}`) * MICRO_AMOUNT;
      createActivity({
        variables: {
          ...activity,
          fundAmt,
        },
      });

      setActivity({ ...initialFormState });
    }
  };

  return (
    <div className={classes.ActivityForm}>
      <ErrorList errors={errors} />
      <div className={classes.FormContainer}>
        <FormClose onClose={closeHandler} />
        {isActivitiesActionLoading ? (
          <Loading />
        ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className={classes.FormGroup}>
                <TextField
                  label="Description"
                  value={activity.description}
                  onChange={updateFormControl("description")}
                />
              </div>
              <div className={classes.FormGroup}>
                <NumberField
                  label="Fund Amount"
                  value={activity.fundAmt}
                  onChange={updateFormControl("fundAmt")}
                />
              </div>
              <div className={classes.FormGroup}>
                <label>Positive</label>
                <input
                  type="checkbox"
                  checked={activity.positive}
                  onChange={updatePositive}
                />
              </div>
              <div className={classes.ButtonContainer}>
                <Button type={ButtonType.primary} onClick={submitFormHandler}>
                  Submit
              </Button>
              </div>
            </form>
          )}
      </div>
    </div>
  );
};

export default ActivityForm;
