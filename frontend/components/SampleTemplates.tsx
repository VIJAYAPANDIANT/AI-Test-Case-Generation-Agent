"use client";

import React from "react";
import { Terminal, CreditCard, UserPlus, ShoppingCart, MessageSquare } from "lucide-react";

interface Template {
  name: string;
  icon: React.ComponentType<any>;
  prompt: string;
}

interface SampleTemplatesProps {
  onSelectTemplate: (prompt: string) => void;
  disabled?: boolean;
}

const TEMPLATES: Template[] = [
  {
    name: "Login API",
    icon: Terminal,
    prompt: `POST /api/v1/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@gmail.com",
  "password": "Password123!"
}

Requirements:
- Validate that the email field contains a valid email format.
- Ensure password meets safety criteria (at least 8 characters, numbers, and symbols).
- Verify password match using bcrypt.
- Respond with status 200 and a JWT token on success.
- Respond with status 401 on incorrect credentials.
- Respond with status 429 after 5 failed attempts.`
  },
  {
    name: "Payment Gateway",
    icon: CreditCard,
    prompt: `function processStripePayment(amount, currency, paymentMethodId) {
  if (!amount || amount <= 0) {
    throw new Error("Invalid payment amount");
  }
  if (!paymentMethodId) {
    throw new Error("Payment method ID is required");
  }
  
  // Integrate Stripe paymentIntent
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert to cents
    currency: currency || "usd",
    payment_method: paymentMethodId,
    confirm: true
  });
}`
  },
  {
    name: "User Registration",
    icon: UserPlus,
    prompt: `POST /api/users/register
Request:
{
  "username": "coder123",
  "email": "dev@testgen.ai",
  "password": "SecurePassword!9"
}

Business Logic:
1. Validate email is unique in the database.
2. Check if username is already taken.
3. Validate password complexity.
4. Hash the password using Argon2.
5. Create user record with active=false.
6. Trigger email verification background task.`
  },
  {
    name: "E-commerce Checkout",
    icon: ShoppingCart,
    prompt: `function checkoutCart(cartId, userId, couponCode) {
  // 1. Fetch user cart items
  const cart = db.carts.find(cartId);
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  
  // 2. Validate inventory availability for each item
  cart.items.forEach(item => {
    const product = db.products.find(item.productId);
    if (product.inventory < item.quantity) {
      throw new Error(\`Product \${product.name} is out of stock\`);
    }
  });

  // 3. Apply coupon code discounts
  let discount = 0;
  if (couponCode) {
    const coupon = db.coupons.find(couponCode);
    if (coupon && coupon.isValid) {
      discount = coupon.percentage;
    }
  }

  // 4. Create invoice record
  const subtotal = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const total = subtotal * (1 - discount / 100);
  return db.invoices.create({ userId, total, items: cart.items });
}`
  },
  {
    name: "Chat Application",
    icon: MessageSquare,
    prompt: `// WebSocket Chat Message Handler
io.on("connection", (socket) => {
  socket.on("join_room", ({ roomId, userId }) => {
    if (!roomId || !userId) {
      return socket.emit("error", { message: "Invalid parameters" });
    }
    socket.join(roomId);
    socket.to(roomId).emit("user_joined", { userId });
  });

  socket.on("send_message", ({ roomId, message, senderId }) => {
    if (!message || message.trim() === "") return;
    const cleanMessage = sanitizeHtml(message); // sanitize inputs
    
    db.messages.save({ roomId, message: cleanMessage, senderId });
    io.to(roomId).emit("new_message", { message: cleanMessage, senderId });
  });
});`
  }
];

export default function SampleTemplates({ onSelectTemplate, disabled }: SampleTemplatesProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-4 animate-fade-in">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
        Select a Sample Prompt Template
      </label>
      <div className="flex flex-wrap gap-2.5">
        {TEMPLATES.map((tpl, i) => {
          const Icon = tpl.icon;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectTemplate(tpl.prompt)}
              disabled={disabled}
              className="flex items-center gap-2 rounded-xl bg-slate-900 border border-white/5 hover:border-indigo-500/40 hover:bg-slate-900/60 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-md"
            >
              <Icon className="h-4 w-4 text-indigo-400" />
              {tpl.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
