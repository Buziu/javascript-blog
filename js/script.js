/* eslint-disable no-inner-declarations */
'use strict';
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleHref = clickedElement.getAttribute('href');
    console.log(articleHref);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleHref);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',  
    optArticleAuthorSelector = '.post .post-author',
    optTagsListSelector = '.tags .list';

  function generateTitleLinks(customSelector = ''){
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);
    /* remove contents of titleList */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      /* for each article */
      const articleId = article.getAttribute('Id');
      /* get the article id */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* find the title element */
      let linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      console.log(linkHTML);
      /* get the title from the title element create HTML of the link */
      const subject = document.querySelector('ul.titles');
      subject.insertAdjacentHTML('beforeend', linkHTML);
    }
    /* insert link into titleList */
  }

  generateTitleLinks();
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
  
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      console.log(titleList);
      /* make html variable with empty string */
      let html= '';  
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);  
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);
        /* generate HTML of the link */
        let linkHTML = '<li><a href="#tag-'+ tag +'">' + tag +'</a></li>';
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(allTags.indexOf(linkHTML) == -1){
          /* [NEW] add generated code to allTags array */
          allTags.push(linkHTML);
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
  
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  }
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked!');
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    /* find all tag links with class active */
    let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);
    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
      console.log(activeTagLink);
      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]' );
    /* START LOOP: for each found tag link */
    for( let tagLink of tagLinks){
      
      /* add class active */
      tagLink.classList.add('active');
      console.log(tagLink);
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log(tagsLinks);
    /* START LOOP: for each link */
    for(let tagLink of tagsLinks){
    /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    articles.innerHTML = '';
    for (let article of articles) {
      const authorName = article.querySelector(optArticleAuthorSelector);
      console.log(authorName);
      let html= '';  
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);  
      let linkHTML = '<a href="#author-'+ articleAuthor +'">' + articleAuthor + '</a>';
      console.log(linkHTML);
      html = html + linkHTML;
      authorName.innerHTML = html;
      console.log(authorName);
    }
  }
  
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked!');
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract author from the "href" constant */
    const author = href.replace('#author-','');
    /* find all authors links with class active */
    let activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(activeAuthorsLinks);
    /* START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorsLinks){
      console.log(activeAuthorLink);
      /* remove class active */
      activeAuthorLink.classList.remove('active');
      /* END LOOP: for each active author link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const AuthorsLinks = document.querySelectorAll('a[href="' + href + '"]' );
    /* START LOOP: for each found author link */
    for( let authorLink of AuthorsLinks){
      
      /* add class active */
      authorLink.classList.add('active');
      console.log(authorLink);
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
    console.log(authorsLinks);
    /* START LOOP: for each link */
    for(let authorLink of authorsLinks){
    /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();

  
}