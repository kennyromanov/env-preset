# env-preset

The utility allows you to easily template your .env files by mapping it in .json.

### Here's a simple example:

```json
{
  "@extends": ".examples/prod/bar.json",

  "siteName": "Foo",
  "siteDomain": "example.com",
  "siteUrl": "https://{siteDomain}/help",

  "webmasterName": "webmaster",
  "webmasterEmail": "{webmasterName}@{siteDomain}",

  "debug": 0
}
```

vvv

```env
# Autogenerated with env-preset
SITE_NAME=Foo
SITE_DOMAIN=example.com
SITE_URL=https://example.com/help
WEBMASTER_NAME=webmaster
WEBMASTER_EMAIL=webmaster@example.com
HELLO_FROM_BAR={"bar":"Hello World!"}
DEBUG=0
```

---

## Installation

1. The project requires Node v14 or higher. To install it, use **npm**:

```shell
npm install --save-dev env-preset
```

2. After the installation create **.epconfig.json** and enter your preferences:

```shell
nano .epconfig.json
```

Available preferences:

```json
{
  "input": ".examples/prod/foo.json",
  "envInput": ".env.example",
  "output": ".env",
  "depth": 3,
  "objDepth": 3,
  "logging": 0,
  "errorLogging": 1
}
```

3. Compile your **ENVs**:

```shell
npx env-preset
```

**You're all set!**

---

## Tips & Tricks

1. You can set all preferences in **.epconfig.json**:

```json
{
  "input": ".configs/prod.json",
  "output": ".env",
  "errorLogging": 0
}
```

2. The **"@extends"** directive mixes your ENV with the target one:

```json
{
  "@extends": ".examples/variables.json",
  "color": "{green}",
  "secondColor": "{blue}"
}
```

3. You can use **CLI** to override the config:

```shell
env-preset --input .examples/prod.json --output .env
```

---

**env-preset**  
by Kenny Romanov
