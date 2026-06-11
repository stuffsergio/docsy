import { sileo } from "sileo";

export const successToast = (title, desc) => {
  sileo.success({
    title: title,
    description: desc,
    autopilot: { expand: 500, collapse: 2500 },
  });
};

export const errorToast = (title, desc) => {
  sileo.error({
    title: title,
    description: desc,
  });
};

export const infoToast = (title) => {
  sileo.info({ title: title });
};

export const actionToast = (title, desc, buttonTitle, func) => {
  sileo.action({
    title: title,
    description: desc,
    button: {
      title: buttonTitle,
      onClick: () => func(),
    },
  });
};
