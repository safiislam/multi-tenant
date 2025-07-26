import { loginService } from "../services/auth.js";
import { addATenantService } from "../services/tenant.js";

export async function loginController(req, res) {
  const serviceFnResponse = await loginService(req.body);

  res.status(serviceFnResponse.code).json({ ...serviceFnResponse });
}

export async function addATenantController(req, res) {
  const serviceFnResponse = await addATenantService(req.body);

  res.status(serviceFnResponse.code).json({ ...serviceFnResponse });
}
