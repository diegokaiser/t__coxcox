'use server';

import nodemailer from 'nodemailer';

const CustomerReservationEmail = async (reservation: Reserva) => {
  if (!reservation?.usuario?.email) {
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.NEXT_PUBLIC__NODEMAILER_service,
      auth: {
        user: process.env.NEXT_PUBLIC__NODEMAILER_server_username,
        pass: process.env.NEXT_PUBLIC__NODEMAILER_server_password
      }
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC__NODEMAILER_server_username,
      to: reservation.usuario.email,
      subject:
        'Cancelación de tu reserva en el Restaurante Mexicano El Pastor 🇲🇽🌮',
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
                                            Confirmación de Reserva
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
                                            Hola ${reservation.usuario.nombre},<br>
                                            Tu reserva en nuestro restaurante se ha cancelado satisfactoriamente.<br>
                                            Recuerda los detalles:
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
                                                        <td style="line-height:36px"> 
                                                          <strong style="color:#000000;font-size:26px;font-family:'RalewayX',verdana,sans-serif;font-weight:400"> 
                                                            <span>Restaurante Mexicano El Pastor</span> 
                                                          </strong>
                                                          <br> 
                                                          <span style="color:#000000;font-size:16px;font-family:'RalewayX',verdana,sans-serif;font-weight:400"> 
                                                            <span>Calle de la Vid 1, 28522 Madrid
                                                            <br>
                                                            </span>
                                                          </span> 
                                                        </td> 
                                                      </tr> 
                                                    </tbody>
                                                  </table> 
                                                </td> 
                                              </tr> 
                                              <tr> 
                                                <td style="border-top:1px solid #000000" height="12">&nbsp;</td> 
                                              </tr> 
                                              <tr> 
                                                <td width="100%"> 
                                                  <table role="presentation" border="0" cellpadding="12" cellspacing="0" width="100%"> 
                                                    <tbody>
                                                      <tr> 
                                                        <td width="33%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Fecha</span><br> <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.fecha}</span></strong> 
                                                        </td> 
                                                        <td width="34%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Hora</span>
                                                          <br> 
                                                          <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.hora}</span>
                                                          </strong> 
                                                        </td>
                                                        <td width="33%" style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif"> 
                                                          <span style="font-size:14px">Personas</span>
                                                          <br> 
                                                          <strong style="font-size:16px;line-height:24px;font-family:'RalewayX',verdana,sans-serif">
                                                            <span style="font-size:16px">${reservation.people} ${reservation.people == '1' ? 'persona' : 'personas'}</span>
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
                                      <span>Para mayor información o si se trata de un error, por favor comunícate con nosotros al +34 606 97 07 57</span>
                                      </td>
                                    </tr>
                                    <tr> 
                                      <td style="line-height:24px;font-family:'RalewayX',verdana,sans-serif;font-size:16px">
                                      <span>Saludos cordiales</span>
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
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.info(
      'app/reservas/[id]/exito/page.tsx/CustomerReservationEmail()',
      error
    );
  }
};

export default CustomerReservationEmail;
