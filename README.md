<div align="center">

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/main/assets/hero.svg" width="100%" alt="Durjoy Saha — audio deepfake detection, NLP, full-stack"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=400&size=18&duration=3400&pause=1000&color=5EEAD4&center=true&vCenter=true&width=620&height=34&lines=audio+deepfake+and+vishing+detection;nlp+for+bangladeshi+job+seekers;pytorch+%C2%B7+fastapi+%C2%B7+react;explainable+models%2C+not+vibes" alt="Focus areas" />

<p>
  <img src="https://komarev.com/ghpvc/?username=DURJOYSAHA21&color=2dd4bf&style=flat&label=VIEWS" alt="Profile views"/>
  <img src="https://img.shields.io/github/followers/DURJOYSAHA21?style=flat&color=8b5cf6&labelColor=1e293b&logo=github&label=FOLLOW" alt="GitHub followers"/>
  <img src="https://img.shields.io/badge/open_to-ML_and_backend_internships-2dd4bf?style=flat&labelColor=1e293b" alt="Open to internships"/>
</p>

</div>

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/main/assets/divider.svg" width="100%" alt="divider"/>

## About

Computer science student working mostly on **audio deepfake and vishing detection** — teaching
models to tell a real voice from a synthetic one, and then making them say *why* they decided.
Everything else on this profile exists because that work needed it: NLP for
[Bangladeshi job seekers](https://github.com/DURJOYSAHA21/jobmatch-bd), optimisation with LLMs for
a university fest, and enough C#, Java and C++ coursework to keep the fundamentals honest.

- Fine-tunes **Wav2Vec2** on ASVspoof and In-the-Wild, evaluates on **EER / AUC** rather than plain accuracy
- Believes a score you cannot read is not finished — **SHAP** and feature attribution over black-box confidence
- Ships the boring half too: FastAPI backends, React frontends, Dockerfiles, deploys

## Languages

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/main/assets/langs.svg" width="100%" alt="Language breakdown by bytes: Jupyter Notebook 81.3%, PHP 6.4%, C# 5.0%, Java 2.1%, Python 1.6%, CSS 1.5%, JavaScript 1.1%, HTML 0.4%, C++ 0.4%, TypeScript 0.2%"/>

## Stack

**Languages**

<img src="https://skillicons.dev/icons?i=py,cpp,cs,java,js,ts,php,html,css" alt="Python, C++, C#, Java, JavaScript, TypeScript, PHP, HTML, CSS"/>

**ML, data and training**

<code>PyTorch</code> · <code>torchaudio</code> · <code>transformers (Wav2Vec2)</code> · <code>librosa</code> · <code>spaCy</code> · <code>sentence-transformers</code> · <code>scikit-learn</code> · <code>SHAP</code> · <code>Whisper</code> · <code>PuLP</code> · <code>pandas</code> · <code>NumPy</code>

**Serving and front end**

<img src="https://skillicons.dev/icons?i=fastapi,react,vite,tailwind,dotnet,postgres,sqlite,docker,git,github,vscode" alt="FastAPI, React, Vite, Tailwind, .NET, PostgreSQL, SQLite, Docker, Git, GitHub, VS Code"/>

## The audio work

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/main/assets/waveform.svg" width="100%" alt="Animated audio waveform"/>

The main thread across two repos: [Vishing-Detection](https://github.com/DURJOYSAHA21/Vishing-Detection)
and [Explainable and Generalizable Deepfake Detection for Vishing Attack Recognition](https://github.com/DURJOYSAHA21/Explainable-and-Generalizable-Deepfake-Detection-for-Vishing-Attack-Recognition).

| Layer | What I actually did |
|:---|:---|
| Signal baseline | MFCC, spectral features and zero-crossing rate pipelines, so the learned model has something to beat |
| Learned model | Fine-tuned Wav2Vec2 for sequence classification on ASVspoof and In-the-Wild audio, with VCTK as real speech |
| Evaluation | EER, AUC and ROC as the headline numbers — accuracy alone hides exactly the failures that matter |
| Explainability | SHAP and feature attribution, to separate a model that hears artefacts from one that just memorised the dataset |
| Text side | Whisper transcription plus spaCy, for the linguistic layer of a vishing call |

Generalisation across datasets is the open problem, not a solved one — the notebooks are honest
about where it still breaks.

## Shipped

| Project | Stack | Notes |
|:---|:---|:---|
| **[jobmatch-bd](https://github.com/DURJOYSAHA21/jobmatch-bd)** | `Python` `spaCy` `sentence-transformers` `FastAPI` `React` | NLP job discovery for Bangladeshi CS/tech seekers. Ranks postings against a profile or uploaded CV using embedding similarity plus structured skill, education and location matching — with a plain-English reason behind every score. |
| **[gridwise-llm](https://github.com/DURJOYSAHA21/gridwise-llm)** | `Python` `Gemini` `PuLP` `FastAPI` | Public API that reads campus operator notes and returns a cost-optimal 24-hour energy schedule. LLM interpretation with a validated deterministic fallback, built for the BUP CSE Fest 2026 preliminary. |
| **[Vishing-Detection](https://github.com/DURJOYSAHA21/Vishing-Detection)** | `PyTorch` `Wav2Vec2` | Final tested model configurations and the trained pipeline. |
| **[Explainable Deepfake Detection](https://github.com/DURJOYSAHA21/Explainable-and-Generalizable-Deepfake-Detection-for-Vishing-Attack-Recognition)** | `PyTorch` `SHAP` | Detection built to stay generalisable across datasets and explain its own decisions. |
| **[DevVault](https://github.com/DURJOYSAHA21/DevVault)** | `C#` `.NET` | CLI that inspects a project and reports dependencies, diagnostics and structure. |
| **[Zoo-Management](https://github.com/DURJOYSAHA21/Zoo-Management)** | `C#` `OOP` | OOP-II system: animals, staff, tasks, OTP login, real-time chat, zoo map, doctor assignment and a local banking module. |
| **[Machine-Learning](https://github.com/DURJOYSAHA21/Machine-Learning)** | `Python` `scikit-learn` | Regression and classification coursework, including gradient descent written out by hand. |
| **[React](https://github.com/DURJOYSAHA21/React)** | `JavaScript` `React` | Component practice builds, from single components to working pages. |
| **[Leetcode](https://github.com/DURJOYSAHA21/Leetcode)** | `C++` | Ongoing DSA practice, committed as it happens. |

Coursework archives: `Advance-Dot-Net`, `Compiler-Lab-`, `Graphics`, `WebTech`, `JOB-PORTAL`,
`Shop-Management`, `SkillHub`, `TypeScript`, `Python`, `LabTask`.

## Telemetry

Refreshed nightly by a GitHub Action that reads the API directly — no third-party badge service to
go quiet.

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/main/assets/telemetry.svg" width="100%" alt="Contribution telemetry: 208 contributions, 4 day streak, 4 day best streak"/>

The snake crawls through the same grid. It appears once the `profile` workflow has run.

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/output/github-contribution-grid-snake.svg" alt="Contribution grid snake animation"/>

## Cooldown

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://api.memegen.link/images/drake/reading_the_docs/reading_the_source.png?width=300" alt="Drake meme: reading the source instead of the docs"/>
    </td>
    <td align="center" width="33%">
      <img src="https://api.memegen.link/images/woman-cat/it_works_on_my_machine/the_ci_runner.png?width=300" alt="Woman yelling at cat: it works on my machine"/>
    </td>
    <td align="center" width="33%">
      <img src="https://api.memegen.link/images/gb/finish_it_a_week_early/finish_it_the_night_before/finish_it_that_morning/git_push_on_the_bus.png?width=300" alt="Expanding brain meme about deadlines"/>
    </td>
  </tr>
</table>

## Now

- Pushing the deepfake detector to hold up on datasets it has never seen
- Getting `jobmatch-bd` in front of actual job seekers instead of sample postings
- Writing up what audio features actually buy you over a raw waveform
- Reading more, shipping at a calmer pace

<p align="center">
  <a href="https://github.com/DURJOYSAHA21">
    <img src="https://img.shields.io/badge/github-DURJOYSAHA21-2dd4bf?style=for-the-badge&logo=github&labelColor=1e293b" alt="GitHub profile"/>
  </a>
  <a href="https://github.com/DURJOYSAHA21?tab=repositories">
    <img src="https://img.shields.io/badge/all_repositories-8b5cf6?style=for-the-badge&labelColor=1e293b" alt="All repositories"/>
  </a>
</p>

<!-- Add an email / LinkedIn badge here once you want it public. -->

<div align="center">

<img src="https://raw.githubusercontent.com/DURJOYSAHA21/DURJOYSAHA21/main/assets/divider.svg" width="100%" alt="divider"/>

</div>
