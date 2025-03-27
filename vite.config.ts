import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { execSync } from "child_process";

function getGitCommitHash() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

function getGitCommitLink() {
  const repoUrl = execSync("git config --get remote.origin.url")
    .toString()
    .trim();
  const commitHash = getGitCommitHash();

  // Convert SSH URL to HTTPS
  let formattedUrl = repoUrl.replace(/\.git$/, "");
  if (formattedUrl.startsWith("git@")) {
    formattedUrl = formattedUrl.replace(":", "/").replace("git@", "https://");
  }

  return `${formattedUrl}/commit/${commitHash}`;
}

function getGitCommitTime() {
  return execSync("git log -1 --format=%ct").toString().trim(); // UNIX timestamp
}

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  define: {
    __GIT_COMMIT_HASH__: JSON.stringify(getGitCommitHash()),
    __GIT_COMMIT_URL__: JSON.stringify(getGitCommitLink()),
    __GIT_COMMIT_TIME__: JSON.stringify(getGitCommitTime()),
  },
});
