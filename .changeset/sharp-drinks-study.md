---
"@mogeko/utils": minor
---

Add AES-GCM encryption and decryption functions.

The `encrypt` and `decrypt` functions will not export in `index.js`. They are only available in the `aes-gcm` module.

```typescript
import { encrypt, decrypt } from "@mogeko/utils/aes-gcm";
```
