const questions = document.querySelectorAll('.faq-item');

questions.forEach(function(question){
    question.addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            const siblingsItems = this.closest('.faq-container').querySelectorAll('.faq-item');
            siblingsItems.forEach(function(item){
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = null;
            })
            this.classList.add('active');
            this.querySelector('.faq-content').style.maxHeight = this.querySelector('.faq-content').scrollHeight + "px";

        }
        return;
    })
})

