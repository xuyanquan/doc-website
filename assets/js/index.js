$(function () {
	initHead()
})

var md = window.markdownit();

function Hash (name, value) {
	var reg = new RegExp(name + '=(.*?)(&|$)');
	return location.hash.match(reg) && location.hash.match(reg)[1];
}

function hashChange () {
	var sort = Hash('sort')
	var doc = Hash('doc')
	$('#readme').html('')
	if (sort && doc) {
		initReadMe(sort + '/' + doc)
	} else if (sort && !doc) {
		initMenu(sort)
	}
}

window.onhashchange = hashChange

function initHead () {
	$.get('/SUMMARY.md', function (data) {
		var result = md.render(data);
		$('.header').append(result);
		$('.header ul').addClass('g-clearfix');
		$('.header a').click(function () {
			location.hash = 'sort=' + $(this).attr('href')
			return false
		})
		if (location.hash === '') {
			initMenu($('.header a').eq(0).attr('href'))
		} else if (Hash('sort')) {
			initMenu(Hash('sort'))
		}
		hashChange()
	})
}

function initMenu (path) {
	$.get(path + '/SUMMARY.md', function (data) {
		if (data && data.indexOf('<!DOCTYPE html>') > -1) return;
		var result = md.render(data);
		$('.menu').html(result);
		$('.menu a').click(function () {
			location.hash = 'sort=' + path + '&doc=' + $(this).attr('href')
			return false
		})
	})
}

function initReadMe (path) {
	$.get(path, function (data) {
		if (data && data.indexOf('<!DOCTYPE html>') > -1) return $('#readme').html('无文档');
		var result = md.render(data);
		$('#readme').html(result);
		highLight();
	})
}

function highLight () {
	$('#readme pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}
