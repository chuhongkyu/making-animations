function handleUI() {
    const fileSoundWrapper = document.querySelector('.sound-file-wrapper');
    const fileSoundInput = document.getElementById('sound-file-input');
    const fileModelWrapper = document.querySelector('.model-file-wrapper');
    const fileModelInput = document.getElementById('model-file-input');

    const updateLabel = (input, label) => {
        const file = input.files[0];
        if (file) {
            label.classList.add("active");
        } else {
            label.classList.remove("active");
        }
    };

    fileSoundInput.addEventListener('change', () => updateLabel(fileSoundInput, fileSoundWrapper));
    fileModelInput.addEventListener('change', () => updateLabel(fileModelInput, fileModelWrapper));

    updateLabel(fileSoundInput, fileSoundWrapper);
    updateLabel(fileModelInput, fileModelWrapper);
}

export { handleUI };
