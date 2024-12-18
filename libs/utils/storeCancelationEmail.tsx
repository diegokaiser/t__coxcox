"use server";

import nodemailer from "nodemailer";

const StoreCancelationEmail = async (reservation: Reserva) => {
	if (!reservation?.usuario?.email) {
		return;
	}
	try {
		const transporter = nodemailer.createTransport({
			service: process.env.NEXT_PUBLIC__NODEMAILER_service,
			auth: {
				user: process.env.NEXT_PUBLIC__NODEMAILER_server_username,
				pass: process.env.NEXT_PUBLIC__NODEMAILER_server_password,
			},
		});

		const mailOptions = {
			from: process.env.NEXT_PUBLIC__NODEMAILER_server_username,
			to: process.env.NEXT_PUBLIC__NODEMAILER_server_username,
			subject: "[Importante] Cancelación de reserva 😶 ",
			html: `
        <div>
          <table role="presentation" border="0" cellpadding="16" cellspacing="0" width="100%" style="background: #ffffff" lang="es">
            <tbody>
              <tr>
                <td align="center">
                  <table role="presentation" border="0" cellpadding="16" cellspacing="0">
                    <tbody>
                      <tr>
                        <td></td>
                        <td align="center" width="656">
                          <table role="presentation" border="0" cellpadding="8" cellspacing="0" align="center" width="100%" style="max-width: 656px; background-color: #ffffff; color: #000000">
                            <tbody>
                              <tr>
                                <td style="font-family:'RalewayX',verdana,sans-serif;font-size:16px;line-height:24px;text-align:left;padding:0px">
                                  <table width="100%" role="presentation" border="0" cellpadding="8" cellspacing="0">
                                  </table>
                                  <table width="100%" style="padding: 8px" role="presentation" border="0" cellpadding="8" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td style="text-align: center">
                                          <strong style="font-size:20px;line-height:24px;font-family:'RalewayX',verdana,sans-serif;font-weight:700">
                                            Cancelación de Reserva
                                          </strong>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="line-height:0">
                                          <div style="height: 4px"></div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <span>
                                            Esta reserva ha sido cancelada:
                                          </span>
                                        </td>
                                      </tr>
                                      <tr> 
                                        <td height="12"></td>
                                      </tr>
                                      <tr> 
                                        <td> 
                                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #000000;border-radius:4px"> 
                                            <tbody>
                                              <tr> 
                                                <td width="100%"> 
                                                  <table role="presentation" border="0" cellpadding="12" cellspacing="0" width="100%"> 
                                                    <tbody>
                                                      <tr> 
                                                        <td width="50%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Fecha</span><br> <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.fecha}</span></strong> 
                                                        </td> 
                                                        <td width="50%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Hora</span>
                                                          <br> 
                                                          <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.hora}</span>
                                                          </strong> 
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td width="50%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">A nombre de</span><br> <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.usuario.nombre} ${reservation.usuario.apellidos}</span></strong> 
                                                        </td> 
                                                        <td width="50%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Personas</span>
                                                          <br> 
                                                          <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.people} ${reservation.people == "1" ? "persona" : "personas"}</span>
                                                          </strong>
                                                        </td> 
                                                      </tr> 
                                                    <tr>
                                                    <td width="50%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Email</span><br> <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.usuario.email}</span></strong> 
                                                        </td> 
                                                        <td width="50%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Teléfono</span>
                                                          <br> 
                                                          <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.usuario.telefono}</span>
                                                          </strong>
                                                        </td> 
                                                      </tr> 
                                                    </tbody>
                                                  </table> 
                                                </td> 
                                              </tr>
                                            </tbody>
                                          </table> 
                                        </td> 
                                      </tr>
                                      <tr> 
                                      <td style="line-height:24px;font-family:'RalewayX',verdana,sans-serif;font-size:16px">
                                      <span>Ten en cuenta que ${reservation.usuario.nombre} ${reservation.usuario.mkt ? "sí" : "no"} quiere ser incluido en la lista de difusiones</span>
                                      </td>
                                    </tr>
                                    <tr> 
                                      <td style="line-height:24px;font-family:'RalewayX',verdana,sans-serif;font-size:16px">
                                      <span>Saludos</span>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.info(
			"app/reservas/[id]/exito/page.tsx/StoreCancelationEmail()",
			error
		);
	}
};

export default StoreCancelationEmail;
