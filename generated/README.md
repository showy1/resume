# 職務経歴書

## 基本情報

| key | value |
| --- | --- |
| 氏名 | Shoichi Yoshitomi |
| 職業 | エンジニア |
| 居住地 | 埼玉県 |
| 学歴 | 東京工業大学 学士課程卒業 / 修士課程修了 |

## PR

- 学生時代は電気電子工学を専攻し、国際学会発表や学術論文執筆を行う。
- 修士課程修了後、大手電気機器メーカーでの研究職を経て、ソフトウェアエンジニアとしてスタートアップ企業に参画。
- Web アプリケーション開発について全般的に担当可能。
- 未経験の技術や領域であっても、主体的かつ短期間でのキャッチアップが可能。
- 技術だけでなく事業自体にも関心を持って開発に携わりたいと考えている。

## 開発環境・主要ツール

MacBook with M1 Chip, Visual Studio Code, ChatGPT, GitHub Copilot

## 技術スタック

### 言語

Python, TypeScript, Solidity, C#, Go, JavaScript, Google Apps Script

### DB

Amazon DynamoDB, PostgreSQL, Redis, MySQL

### フレームワーク等

- バックエンド: FastAPI, Django, NestJS, gqlgen
- フロントエンド: React, Next.js, Vue.js, SvelteKit, Gatsby
- その他: AWS CDK, Hardhat

### AWS

AWS Lambda, Amazon ECR, Amazon DynamoDB, Amazon SQS, Amazon API Gateway, Amazon S3, Amazon CloudFront, AWS CloudFormation, Amazon CloudWatch, AWS IAM, Amazon ElastiCache, Amazon OpenSearch Service, Amazon EventBridge, AWS Cost Explorer

### その他

- バックエンド関連: Prisma, Pandas, MeCab
- フロントエンド関連: Tailwind CSS, Material UI, Storybook, Relay, Apollo Client, Sass
- CI/CD ツール: GitHub Actions, BitBucket Pipelines
- Web3 関連: web3-react, MetaMask, OpenSea
- その他 XaaS: Slack, Vercel, Netlify, microCMS, OpenAI API, Azure OpenAI Service, SendGrid, YouTube Data API
- その他: GraphQL, Docker, Elasticsearch, Serverless Framework, Unity, Nginx


## 主要参画プロジェクト

数ヶ月以上密に関わったプロジェクトの一覧。

使用技術については、原則自身が使用したものを記載し、自身の関与度合いが低いものを記載する場合はカッコ内に記載した。

### AI キャラクターによる 24 時間配信システム (2023-08 ~ )

<details>

<summary>詳細</summary>

#### サービス概要

動画・ライブ配信プラットフォーム上で AI キャラクターが 24 時間配信を行うエンタメコンテンツ。

#### チーム規模

エンジニア: 2人, 開発チーム全体: 5人

#### 担当業務

- 配信で用いる発話内容生成用 API の開発
- 配信で用いる発話内容の情報源や画像などを管理するための Web アプリケーション構築全般

#### 使用技術

- 言語: Python, TypeScript
- IaaS: AWS
- DB: Amazon DynamoDB
- フレームワーク・主要ライブラリ: FastAPI, React, AWS CDK
- IaaS 内サービス: AWS Lambda, Amazon ECR, Amazon DynamoDB, Amazon SQS, Amazon API Gateway, Amazon S3, Amazon CloudFront, AWS CloudFormation, Amazon CloudWatch, AWS IAM
- その他: OpenAI API, GitHub Actions, Docker, Slack, Material UI

</details>

### NFT コンテンツの開発 (2022-11 ~ 2023-08)

<details>

<summary>詳細</summary>

#### サービス概要

オリジナルの SF 作品を基にした NFT コンテンツの提供。

#### チーム規模

エンジニア: 3人, 開発チーム全体: 約7人

#### 担当業務

- ERC721, ERC1155 に準拠した NFT コントラクトの開発
- メインネットおよびテストネットへのコントラクトデプロイ
- MerkleProof を利用した AllowList 実装
- Web サイトからの NFT Mint 機能の実装
- Web サイト上での複数コントラクトの NFT 管理機能の実装
- microCMS を利用した記事投稿・管理機能の実装
- Web サイトの UI 実装

#### 使用技術

- 言語: TypeScript, Solidity
- IaaS: GCP
- DB: PostgreSQL
- フレームワーク・主要ライブラリ: NestJS, Next.js, Hardhat
- IaaS 内サービス: Cloud Storage, Cloud SQL, (Cloud Run, Compute Engine)
- その他: GraphQL, web3-react, MetaMask, Prisma, Tailwind CSS, Apollo Client, Docker, Vercel, microCMS, OpenSea, (GitHub Actions, Terraform, Cloud Build, Infura)

</details>

### ユーザーと対話可能な AI キャラクターの開発 (2022-11 ~ )

<details>

<summary>詳細</summary>

#### サービス概要

AI キャラクターの育成・コミュニケーション体験などのエンタメコンテンツの提供。

#### チーム規模

エンジニア: 約7人, 開発チーム全体: 約12人

#### 担当業務

- FastAPI/Python による API の開発
- 大規模言語モデルや MeCab などを利用した自然言語処理
- スクレイピングや Elasticsearch を用いたデータ収集と活用
- AWS Lambda, DynamoDB などを用いたサーバーレスアプリケーションの構築

#### 使用技術

- 言語: Python, C#
- IaaS: AWS
- DB: Amazon DynamoDB, Redis
- フレームワーク・主要ライブラリ: FastAPI
- IaaS 内サービス: AWS Lambda, Amazon ECR, Amazon DynamoDB, Amazon ElastiCache, Amazon OpenSearch Service, Amazon API Gateway, AWS CloudFormation, Amazon CloudWatch, AWS IAM
- その他: MeCab, Elasticsearch, Unity, Serverless Framework, GitHub Actions, Docker, OpenAI API, Azure OpenAI Service, Slack, (Blender)

</details>

### 医療翻訳通話情報管理システムの開発 (2021-05 ~ 2022-10)

<details>

<summary>詳細</summary>

#### サービス概要

医療機関における外国人患者の診療の際に使用できる医療翻訳通話システムの提供。

#### チーム規模

エンジニア: 2人, 開発チーム全体: 2人

#### 担当業務

- Go による GraphQL API の開発
- React, TypeScript, Tailwind CSS を用いた管理画面の開発

#### 使用技術

- 言語: Go, TypeScript
- IaaS: AWS
- DB: PostgreSQL
- フレームワーク・主要ライブラリ: gqlgen, React
- IaaS 内サービス: Amazon S3, (Amazon EC2, Amazon RDS)
- その他: Relay, SendGrid

</details>

### 企業向け健康管理サービスの開発 (2021-01 ~ 2022-10)

<details>

<summary>詳細</summary>

#### サービス概要

健康診断結果の管理、健康診断予約情報の管理、ストレスチェックの実施・結果管理などの機能を有する Web サービスの提供。

#### チーム規模

エンジニア: 約10人, 開発チーム全体: 約15人

#### 担当業務

- Django/Python, Vue.js/TypeScript/JavaScript を用いた Web アプリケーションの開発
- GCP, Nginx などを用いたインフラ構築
- Bitbucket Pipelines を用いた CI パイプライン構築
- ストレスチェックや健康診断結果の分析機能の開発
- PM や CS (カスタマーサクセス) からの課題ヒアリングと、それに基づく設計・実装

#### 使用技術

- 言語: Python, TypeScript, JavaScript
- IaaS: GCP
- DB: MySQL
- フレームワーク・主要ライブラリ: Django, Vue.js
- IaaS 内サービス: Compute Engine, Cloud SQL, Cloud Storage
- その他: Pandas, Storybook, Sass, BitBucket Pipelines, Nginx, SendGrid

</details>



## その他参画プロジェクト

<details>

<summary>詳細</summary>

短期間作業が発生したプロジェクトの一部と使用技術。

使用技術については、自身が使用したものを記載した。

### AWS の請求情報を Slack により定期通知するシステム

- 言語: Python
- IaaS: AWS
- IaaS 内サービス: AWS Lambda, Amazon EventBridge, AWS Cost Explorer
- その他: Serverless Framework, Slack

### AI キャラクターに関する Web サイトの保守

- 言語: TypeScript, Google Apps Script
- フレームワーク・主要ライブラリ: SvelteKit
- その他: Vercel, microCMS, YouTube Data API

### エンタメ系企業コーポレートサイトの保守

- 言語: TypeScript
- フレームワーク・主要ライブラリ: Gatsby
- その他: Netlify, microCMS



</details>
