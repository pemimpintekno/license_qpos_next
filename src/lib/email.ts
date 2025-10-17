import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a license key and a download link for the application to a recipient.
 * @param {string} to The recipient's email address.
 * @param {string} serialKey The license key to send.
 */
export async function sendLicenseEmail(to: string, serialKey: string) {
  // Get the application download link from environment variables.
  // Provide a placeholder if it's not set.
  const appDownloadLink =
    process.env.APP_DOWNLOAD_LINK ||
    "https://drive.google.com/drive/folders/1CUfgP0M_Rv2CdBIaR0Q7IjOC0irhlslh?usp=sharing";

  try {
    const { data, error } = await resend.emails.send({
      from: `QPOS: Kasir Lengkap & Offline <${
        process.env.EMAIL_FROM || "onboarding@resend.dev"
      }>`,
      to: [to],
      subject: "Kunci Lisensi dan Link Download QPOS Anda",
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #444;">Terima kasih atas pembelian Anda!</h2>
                <p>Berikut adalah kunci lisensi untuk mengaktifkan aplikasi:</p>
                <p style="background-color: #f4f4f4; border-left: 5px solid #ccc; padding: 10px; font-size: 20px; font-family: monospace;">
                    <strong>${serialKey}</strong>
                </p>
                <p>Silakan klik tombol di bawah ini untuk mengunduh aplikasi:</p>
                <a href="${appDownloadLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 5px;">
                    Unduh Aplikasi
                </a>
                <p style="margin-top: 20px;">Salam hormat,<br>Tim QPOS</p>
            </div>
        `,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error("Failed to send license email.");
    }

    console.log("Message sent successfully. ID:", data?.id);
  } catch (error) {
    console.error("Error sending email:", error);
    // Re-throw the error to be handled by the calling function in index.ts
    throw new Error("Failed to send license email.");
  }
}
