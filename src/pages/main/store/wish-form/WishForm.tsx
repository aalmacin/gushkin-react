import React, { useState } from "react";
import classes from "./WishForm.module.scss";


import { MICRO_AMOUNT } from "functions/global.constants";
import TextField from "components/TextField";
import NumberField from "components/NumberField";
import Button from "components/Button";
import ErrorList from "pages/error";
import { useWishFormUILogic } from "./useWishFormUILogic";
import { Priority, Status } from "./graphql/useCreateWish";

interface WishFormProps {
  onCompleted: Function;
}

const WishForm: React.FC<WishFormProps> = ({ onCompleted }) => {

  const { wish, setWish, createWish } = useWishFormUILogic({ onCompleted });


  const [errors, setErrors] = useState<string[]>([]);


  const getErrors = () => {
    const errorList = [];

    if (!wish.description) {
      errorList.push("Description is required.");
    }

    if (!wish.price) {
      errorList.push("Price is required.");
    }

    if (!wish.priority) {
      errorList.push("Priority is required.");
    }

    if (!wish.status) {
      errorList.push("Status is required.");
    }

    return errorList;
  };

  const updateFormControl = (
    key: "description" | "price" | "source" | "priority" | "status"
  ) => (event: any) => {
    setWish({
      ...wish,
      [key]: event.target.value
    });
    setErrors(getErrors());
  };

  const submitFormHandler = () => {
    const errorList = getErrors();
    setErrors(errorList);

    if (errorList.length === 0) {
      const price = parseFloat(`${wish.price}`) * MICRO_AMOUNT;
      createWish({
        variables: {
          ...wish,
          price
        }
      });
    }
  };

  const priorityOptions = [
    {
      value: Priority.VERY_HIGH,
      desc: "Very High"
    },
    {
      value: Priority.HIGH,
      desc: "High"
    },
    {
      value: Priority.MEDIUM,
      desc: "Medium"
    },
    {
      value: Priority.LOW,
      desc: "Low"
    },
    {
      value: Priority.VERY_LOW,
      desc: "Very Low"
    }
  ];

  const statusOptions = [
    {
      value: Status.not_bought,
      desc: "Not bought"
    },
    {
      value: Status.bought,
      desc: "Bought"
    },
    {
      value: Status.disabled,
      desc: "Disabled"
    }
  ];

  return (
    <div className={classes.WishForm}>
      <ErrorList errors={errors} />
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <TextField
            id="wish-description"
            label="Description"
            value={wish.description}
            onChange={updateFormControl("description")}
          />
        </div>
        <div>
          <NumberField
            id="wish-price"
            label="Price"
            value={wish.price}
            onChange={updateFormControl("price")}
          />
        </div>
        <div>
          <TextField
            id="wish-source"
            label="Source"
            value={wish.source}
            onChange={updateFormControl("source")}
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            onChange={updateFormControl("priority")}
            value={wish.priority}
          >
            {priorityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            onChange={updateFormControl("status")}
            value={wish.status}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button
            type="Primary"
            onClick={submitFormHandler}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WishForm;
