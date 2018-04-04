/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午2:48
 * Desc:
 */
import AppRouter from "../../routes/routesBuilder";

export default nav = (state, action) => {
  const nextState = AppRouter.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};