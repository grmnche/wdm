import Router from "./utils/Router.ts";
import AuthController from "./controllers/AuthController.ts";
import { SignUp } from "./pages/registration/index.ts";
import { MessengerPage } from "./pages/messenger/index.ts";
import { Login } from "./pages/login/index.ts";
import { ProfilePage } from "./pages/profile/index.ts";
import { Error400 } from "./pages/error/error400/index.ts";
import { Error500 } from "./pages/error/error500/index.ts";
import { SettingsPassword } from "./pages/profile/modules/settings-password/index.ts";
import { Settings } from "./pages/profile/modules/settings/index.ts";

enum Routes {
  Index = "/",
  SignUp = "/sign-up",
  Profile = "/profile",
  Messenger = "/messenger",
  Error400 = "/error400",
  Error500 = "/error500",
  SettingsPassword = "/settings-password",
  Settings = "/settings",
}

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, Login)
    .use(Routes.SignUp, SignUp)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Error400, Error400)
    .use(Routes.Error500, Error500)
    .use(Routes.SettingsPassword, SettingsPassword)
    .use(Routes.Settings, Settings);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
