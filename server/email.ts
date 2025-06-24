
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderNotification(orderData: any) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Order #${orderData.id} - Sinful New Mexico`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${orderData.id}</p>
      <p><strong>Customer:</strong> ${orderData.customerName}</p>
      <p><strong>Email:</strong> ${orderData.customerEmail}</p>
      <p><strong>Phone:</strong> ${orderData.customerPhone || 'Not provided'}</p>
      <p><strong>Total:</strong> $${orderData.totalAmount}</p>
      
      <h3>Items Ordered:</h3>
      <ul>
        ${JSON.parse(orderData.items).map((item: any) => 
          `<li>${item.product.name} - Quantity: ${item.quantity} cases</li>`
        ).join('')}
      </ul>
      
      <p><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent successfully');
  } catch (error) {
    console.error('Error sending order notification email:', error);
    throw error;
  }
}
