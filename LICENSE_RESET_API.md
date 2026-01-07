# License Deactivation API Documentation

## Overview

This API allows users to reset their ACTIVATED license to UNUSED status using a secure OTP (One-Time Password) verification process.

## Endpoints

### 1. Check License Status (Optional)

**Endpoint:** `POST /api/license/status`

**Purpose:** Check the current status of a license

**Request Body:**

```json
{
  "identifier": "user@example.com" // Can be email or serial key
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "serialKey": "XXXXX-XXXXX-XXXXX-XXXXX",
    "email": "user@example.com",
    "status": "ACTIVATED",
    "deviceId": "device-123",
    "activatedAt": "2026-01-06T10:30:00.000Z",
    "createdAt": "2026-01-05T08:00:00.000Z"
  }
}
```

**Response (Not Found - 404):**

```json
{
  "success": false,
  "message": "License not found"
}
```

---

### 2. Request OTP for License Reset

**Endpoint:** `POST /api/deactivate/request-otp`

**Purpose:** Request an OTP to reset an ACTIVATED license. The OTP will be sent to the email associated with the license.

**Request Body:**

```json
{
  "identifier": "user@example.com" // Can be email or serial key
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "OTP has been sent to your email address",
  "data": {
    "email": "user@example.com",
    "expiresIn": "10 minutes"
  }
}
```

**Response (License Not ACTIVATED - 400):**

```json
{
  "success": false,
  "message": "License is currently UNUSED. Only ACTIVATED licenses can be reset."
}
```

**Response (License Not Found - 404):**

```json
{
  "success": false,
  "message": "License not found"
}
```

---

### 3. Verify OTP and Reset License

**Endpoint:** `POST /api/deactivate/verify-otp`

**Purpose:** Verify the OTP and reset the license from ACTIVATED to UNUSED

**Request Body:**

```json
{
  "identifier": "user@example.com", // Can be email or serial key
  "otp": "123456" // 6-digit OTP received via email
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "License has been successfully reset to UNUSED",
  "data": {
    "serialKey": "XXXXX-XXXXX-XXXXX-XXXXX",
    "email": "user@example.com",
    "status": "UNUSED"
  }
}
```

**Response (Invalid OTP - 400):**

```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

**Response (Invalid Format - 400):**

```json
{
  "success": false,
  "message": "Invalid OTP format. Must be 6 digits."
}
```

---

## User Flow Example

### Step 1: Request OTP

```bash
curl -X POST http://localhost:3000/api/deactivate/request-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "user@example.com"}'
```

### Step 2: Check Email

User receives an email with a 6-digit OTP code (valid for 10 minutes)

### Step 3: Verify OTP and Reset License

```bash
curl -X POST http://localhost:3000/api/deactivate/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "user@example.com", "otp": "123456"}'
```

### Step 4: License is Now UNUSED

The license can now be activated on a different device using the `/api/activate` endpoint

---

## Security Features

1. **OTP Expiration:** OTPs expire after 10 minutes
2. **Single Use:** Each OTP can only be used once
3. **Old OTP Cleanup:** When requesting a new OTP, any unused OTPs for that license are deleted
4. **Status Validation:** Only ACTIVATED licenses can be reset via OTP
5. **Email Verification:** OTP is sent to the email registered with the license

---

## Database Schema Addition

A new `OTP` table has been added:

```prisma
model OTP {
  id            String   @id @default(uuid())
  email         String
  code          String   // 6 digit OTP
  licenseKeyId  String
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  used          Boolean  @default(false)

  @@index([email, code])
  @@map("OTP")
}
```

---

## Migration Required

After updating the schema, run:

```bash
npx prisma migrate dev --name add_otp_model
npx prisma generate
```

---

## Testing Checklist

- [ ] Request OTP with valid email
- [ ] Request OTP with valid serial key
- [ ] Request OTP with non-existent license
- [ ] Request OTP for UNUSED license (should fail)
- [ ] Request OTP for DEACTIVATED license (should fail)
- [ ] Verify OTP with correct code
- [ ] Verify OTP with incorrect code
- [ ] Verify OTP with expired code (wait 10+ minutes)
- [ ] Verify OTP that was already used
- [ ] Check license status after successful reset
- [ ] Re-activate the license using `/api/activate`
