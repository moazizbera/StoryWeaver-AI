# 🔒 Security Guidelines

This document outlines security best practices for StoryWeaver AI.

---

## 🚨 Critical Security Rules

### 1. **NEVER Commit API Keys**

❌ **DO NOT:**
- Commit `.env` files to version control
- Hardcode API keys in source code
- Share API keys in screenshots or videos
- Post API keys in issues or pull requests

✅ **DO:**
- Use `.env.example` with placeholder values
- Store real keys only in local `.env` files
- Use environment variables in production
- Rotate keys immediately if exposed

---

## 🔑 API Key Management

### Getting Your Gemini API Key

1. Visit: [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (it starts with `AIza...`)

### Setting Up Locally

```bash
# 1. Copy the example file
cp .env.example .env

# For backend specifically
cp backend/.env.example backend/.env

# 2. Edit .env and add your REAL key
GEMINI_API_KEY=AIza...your_actual_key_here

# 3. NEVER commit the .env file
# (Already protected by .gitignore)
```

---

## 🐳 Docker Security

The `docker-compose.yml` uses environment variable substitution:

```yaml
environment:
  - GEMINI_API_KEY=${GEMINI_API_KEY}
```

This reads from your local `.env` file **without hardcoding the key**.

### Deployment Security

For production deployments:

```bash
# Option 1: System environment variables
export GEMINI_API_KEY=your_key_here
docker-compose up -d

# Option 2: Docker secrets (recommended for production)
# See: https://docs.docker.com/engine/swarm/secrets/
```

---

## ✅ What's Safe to Commit

### Safe Files (Already in Repository):
- ✅ `.env.example` - Contains only placeholders
- ✅ `.gitignore` - Excludes sensitive files
- ✅ Source code - Uses environment variables
- ✅ Docker files - Uses substitution variables
- ✅ Documentation

### Protected Files (Never Committed):
- 🔒 `.env` - Contains real API keys
- 🔒 `backend/.env` - Contains real API keys
- 🔒 `venv/` - Virtual environment
- 🔒 `node_modules/` - Dependencies
- 🔒 Any file with real credentials

---

## 🔍 Verifying Security

### Check for Exposed Keys

```bash
# Search for potential API keys in tracked files
git grep -E "AIza[0-9A-Za-z_-]{35}"

# Should return NO results
```

### Verify .gitignore

```bash
# Check that .env files are not tracked
git ls-files .env backend/.env

# Should return empty (no files)
```

### Check git status

```bash
git status

# Should NOT show:
# - .env
# - backend/.env
# - node_modules/
# - venv/
```

---

## 🚨 If You Exposed a Key

If you accidentally committed an API key:

### 1. **Immediately Revoke the Key**
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Delete the exposed key
- Generate a new key

### 2. **Remove from Git History**

```bash
# WARNING: Rewrites history - coordinate with team
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (DANGEROUS - use with caution)
git push origin --force --all
```

### 3. **Update Local Configuration**
- Get new API key
- Update local `.env` file
- Never commit it again

---

## 📊 API Usage Monitoring

Monitor your Gemini API usage to detect unauthorized access:

- Visit: [Google Cloud Console](https://console.cloud.google.com/)
- Check API quotas and usage
- Set up billing alerts
- Enable API key restrictions

### Recommended API Key Restrictions:
- **Application restrictions:** HTTP referrers (for web) or IP addresses (for servers)
- **API restrictions:** Limit to "Gemini API" only
- **Usage limits:** Set daily request quotas

---

## 🏆 Security Checklist for Judges

For **Google Gemini Live Agent Challenge 2026** judges reviewing this repository:

✅ **Verified Security Measures:**
- [x] No hardcoded API keys in source code
- [x] `.env` files excluded via `.gitignore`
- [x] `.env.example` files provide safe templates
- [x] Docker uses environment variable substitution
- [x] Source code uses `load_dotenv()` properly
- [x] Security documentation provided
- [x] Clear setup instructions with placeholders

✅ **How to Test Securely:**
1. Clone the repository
2. Copy `.env.example` to `.env`
3. Add your own test API key
4. Run the application
5. Your key stays local and private

---

## 📞 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email: security@storyweaver-ai.com (if available)
3. Or contact the repository owner privately
4. Provide details of the vulnerability
5. Allow time for remediation before disclosure

---

## 📚 Additional Resources

- [Google AI Studio Security Best Practices](https://ai.google.dev/docs/oauth_quickstart)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Docker Secrets Management](https://docs.docker.com/engine/swarm/secrets/)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Last Updated:** March 16, 2026  
**Project:** StoryWeaver AI  
**Challenge:** Google Gemini Live Agent Challenge 2026
