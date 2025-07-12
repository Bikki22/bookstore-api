import { AvailableOrderStatus } from "../utils/constants";

const orderUpdateStatusValidator = () => {
  return [
    body("status")
      .trim()
      .nonEmpty()
      .isIn(AvailableOrderStatus)
      .withMessage("Invalid order status"),
  ];
};

export { orderUpdateStatusValidator };
