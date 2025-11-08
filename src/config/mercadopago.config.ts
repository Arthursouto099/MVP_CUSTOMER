import MercadoPagoConfig from "mercadopago";
import { PreApproval } from "mercadopago"

const mercadoPagoConfig = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string, // seu token do Mercado Pago
});

const preApproval = new PreApproval(mercadoPagoConfig)

export default preApproval;
