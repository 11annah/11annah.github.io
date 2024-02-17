---
layout: page
title: Search this website
permalink: /sitesearch/
---

<div id="search-container">
    <input type="text" id="search-input" placeholder="Search ..." oninput="evaluate_key()">
</div>
<div>
<br>
<label id="result"></label>
<ul id="list" style="list-style-type: none;">
</ul>
<style>
    p{visibility: hidden;}
</style>
<p>zyx / |About</p>
<p>zyx /publications/ |Publications</p>
<p>zyx /teaching/ |Teaching</p>
<p>zyx /software/ |Software</p>
<p>zyx /cv/ |CV</p>
<p>xyz
  {% for post in site.posts %}
      {{ post.url }}
  {% endfor %}
</p>
