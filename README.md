
# ECS CI/CD Pipeline

A Node.js Express API deployed to AWS ECS Fargate via a fully automated GitHub Actions pipeline.

## What this project covers

- Multi-stage Docker builds using Alpine for minimal image size
- Four-stage CI/CD pipeline: lint, test, build, deploy
- Trivy security scanning on every Docker image before push
- Keyless AWS authentication via OIDC - no stored credentials
- Images tagged with git SHA for full traceability
- Automated ECS Fargate deployment on every push to main
- CloudWatch log integration for container observability
- ALB health check integration via dedicated /health endpoint

## Pipeline stages

**Lint and test** - ESLint static analysis and Jest unit tests run on every push to any branch. Failed tests block the pipeline.

**Build and scan** - Docker image built using multi-stage build. Trivy scans for critical CVEs before the image is accepted.

**Push to ECR** - Main branch only. Image pushed to AWS Elastic Container Registry tagged with the git SHA of the triggering commit.

**Deploy to ECS** - New task definition revision registered with the fresh image URI. ECS service updated and redeployed with zero downtime rolling update.

## Infrastructure

- ECS Fargate cluster in us-east-1
- Application Load Balancer with target group health checks on /health
- Task and ALB security groups with least privilege rules
- CloudWatch log group per service for container output
- IAM execution role scoped to ECR pull and CloudWatch write permissions

## Local development

Install dependencies:
npm install

Run tests:
npm test

Run linter:
npm run lint

Start server:
npm start