<script>
  import AFInput from '/++api++/~/abfab/ui/input.svelte';
  import AFButton from '/++api++/~/abfab/ui/button.svelte';
  import { addFile } from './editor.js';
  import { getCorePath, navigateTo } from '../core.js';

  let name;
  let type = 'File';
  let upload;
  let containerPath = '';
  $: containerPath = getCorePath(
    window.location.pathname.replace('/@edit', ''),
  );
  const defaultContents = {
    svelte: '<h1>AbFab!</h1>',
    html: '<h1>AbFab!</h1>',
    js: 'console.log("AbFab!")',
  };

  async function add() {
    if (name) {
      await addFile(
        containerPath,
        name,
        type,
        defaultContents[name.split('.').pop()] || '',
      );
      navigateTo(`${containerPath}/${name}/@edit`);
    }
  }
  async function readFile(reader, file) {
    return new Promise((resolve, reject) => {
      reader.onload = (f) => {
        resolve([file.name, reader.result]);
      };
      reader.onerror = () => {
        reader.abort();
        reject(new Error(`Error on loading file ${file}`));
      };
      // TODO: use readAsArrayBuffer for binaries
      reader.readAsText(file);
    });
  }
  async function uploadFiles({ target }) {
    const reader = new FileReader();
    for (const file of target.files) {
      const [name, contents] = await readFile(reader, file);
      await addFile(containerPath, name, type, contents);
    }
  }
</script>

<main>
  <div>
    <div class="add">
      <AFInput
        bind:value={name}
        label={`Create a new file at ${containerPath}`}
        placeholder="my-file.svelte"
        required
      />
      <div>
        <AFButton size="small" kind="primary" on:click={add}>Add</AFButton>
      </div>
    </div>
  </div>
  <div>
    <div class="drop-zone">
      <p>or drag & drop here</p>
      <input
        class="upload-field"
        bind:this={upload}
        type="file"
        multiple
        on:change={uploadFiles}
      />
    </div>
  </div>
</main>

<style>
  main > div {
    padding: 0 0 1em 1em;
  }
  .drop-zone {
    margin-top: 4em;
    position: relative;
    border: 1px dashed var(--color-neutral-secondary-default);
    text-align: center;
    height: 30vh;
  }
  .upload-field {
    display: block;
    width: 100%;
    height: 30vh;
    opacity: 0;
    position: absolute;
    top: 0;
  }
  .add {
    padding-top: 1em;
  }
</style>
