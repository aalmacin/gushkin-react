import React, { ButtonHTMLAttributes } from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import { createUseStyles } from 'react-jss';
// import { colors } from 'components/variables';
import Button from "components/Button";

// const useStyles = createUseStyles({
//   PerformActivityButton: {
//     border: "none",
//     fontStyle: "normal",
//     fontWeight: "normal",
//     fontSize: 24,
//     padding: "0px 16px",
//     lineHeight: '61px',
//     color: colors.white.base,

//     background: (props) => props.positive ? colors.primary.shade5 : colors.red.shade3,

//     "&:hover": {
//       cursor: "pointer",
//     }
//   },
// });

type ActivityListButtonProps = {
  positive: boolean;
};

const ActivityListButton: React.FC<ActivityListButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ positive, ...props }) => {
  // const classes = useStyles({
  //   positive
  // });
  return (
    <Button
      kind={positive ? "Primary" : "Red"}
      icon={positive ? faPlus : faMinus}
      isSquare
      {...props}
      data-testid={positive ? 'positive' : 'negative'}
    />
  );
};

export default ActivityListButton;