import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artifactsDir = path.join(__dirname, '../artifacts/contracts');
const frontendAbiDir = path.join(__dirname, '../../frontend/src/lib/abi');

fs.mkdirSync(frontendAbiDir, { recursive: true });

function copyAbi(contractName) {
  const contractArtifactsDir = path.join(artifactsDir, `${contractName}.sol`);
  const artifactFile = path.join(contractArtifactsDir, `${contractName}.json`);
  
  if (fs.existsSync(artifactFile)) {
    const artifact = JSON.parse(fs.readFileSync(artifactFile, 'utf8'));
    const abiContent = JSON.stringify(artifact.abi, null, 2);
    fs.writeFileSync(path.join(frontendAbiDir, `${contractName}.json`), abiContent);
    console.log(`✓ Exported ${contractName} ABI to frontend`);
  }
}

copyAbi('Donation');

console.log('\nABI export complete!');
