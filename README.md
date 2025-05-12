# 🤖 Godspeed Hugging Face Plugin Integration

This project demonstrates how to integrate Hugging Face's [Inference API](https://huggingface.co/docs/api-inference/detailed_parameters) with the [Godspeed meta-framework](https://www.godspeed.systems/) as a **custom datasource plugin**, enabling powerful AI tasks such as:

- Text Classification
- Chat Completion
- Translation

## 🚀 Features

- Implements Hugging Face as a Godspeed-compatible `GSDataSource`
- Dynamically resolves models based on task type
- Uses Godspeed's native workflows (`YAML` and `TS`)
- HTTP event triggers for REST-like usage
- Supports both static and dynamic model selection

---

## 🏗️ Project Structure

```bash
.
├── src/
│   ├── datasources/
│   │   ├── huggingface.yaml         # Plugin configuration
│   │   └── types/huggingface.ts     # Datasource implementation
│   ├── functions/                   # Godspeed workflows
│   │   └── hf-*.yaml                # One for each supported task
│   ├── events/                      # HTTP event bindings
│   │   └── hf-*.yaml
│   └── eventsources/http.yaml      # Express server binding
````

---

## 🔌 Supported Tasks

| Task                 | Endpoint                  | Function                 |
| -------------------- | ------------------------- | ------------------------ |
| Text Classification  | `/hf-text-classification` | `hf-text-classification` |
| Chat Completion      | `/hf-chat-completion`     | `hf-chat-completion`     |
| Translation          | `/hf-translation`         | `hf-translation`         |

---

## 🧪 Example Request (Curl)

```bash
curl -X POST http://localhost:9000/hf-text-classification \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": "Godspeed is revolutionary!",
    "model": "distilbert/distilbert-base-uncased-finetuned-sst-2-english"
  }'
```

---

## ⚙️ Plugin Configuration (`huggingface.yaml`)

```yaml
type: huggingface
api_key: <% config.huggingface.api_key %>
default_model: distilbert/distilbert-base-uncased-finetuned-sst-2-english
models:
  textClassification: distilbert/distilbert-base-uncased-finetuned-sst-2-english
  chatCompletion: meta-llama/Llama-2-7b-chat-hf
  translation: Helsinki-NLP/opus-mt-en-de
```

---

## 🛠 Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-org/godspeed-huggingface.git
cd godspeed-huggingface
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Hugging Face API Key

In `config/default.yaml` or `.env`:

```yaml
huggingface:
  api_key: <your_hf_api_key>
```

### 4. Serve Project

```bash
godspeed serve
```

---

## 🧠 Design Notes

* The plugin uses `fnNameInWorkflow` to dynamically resolve the Hugging Face method (`textClassification`, `summarization`, etc.)
* The model is chosen from:

  1. `args.model` (runtime)
  2. `config.models[method]`
  3. `config.default_model`

---

## 📖 Swagger Docs

Once running, open:

```
http://localhost:3000/docs
```

And interact with all endpoints through the Swagger UI.

Great — you can integrate that information cleanly into a new section called **📦 Plugin Installation**, and optionally reference it in **🛠 Setup** as well.

Here’s the updated `README.md` with that addition:

---

### 📦 Plugin Installation

To use the Hugging Face plugin independently in any Godspeed project:

```bash
npm install @avngrstark/plugins-huggingface-as-datasource
```

After installation, configure it under `src/datasources/huggingface.yaml` as shown below and register it in your project’s `datasources` directory.
