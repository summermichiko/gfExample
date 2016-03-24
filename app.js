var app = $('.tinCanTutorial'), name, mbox, lrs, score = 0, comment = "";

// lets you test a block of code for errors
try {
	lrs = new TinCan.LRS({
		endpoint: "https://cloud.scorm.com/tc/L12DQVVPBO/",
		username: "L12DQVVPBO",
		password: "FHo0S01l3EzN1ZCoDvYBwRFHQgPjw2pHe4xC0Zsi",
		allowFail: false
	});
}
// lets you handle the error
catch (ex) {
	console.log("Failed to setup LRS object: " + ex);
}

function changeView(thisView, nextView) {
	app.find('.view' + thisView).hide();
	app.find('.view' + nextView).show();
	$("html, body").animate({
		scrollTop: 0
	}, 300);
}

function createUser() {
	name = app.find('.name').val();
	mbox = app.find('.mbox').val();
	var errName = app.find('.errorNameWrapper');
	var errMbox = app.find('.errorEmailWrapper');
	if (name === '') {
		errName.show();
	} else {
		errName.hide();
	}
	if (mbox === '') {
		errMbox.show();
	} else {
		errMbox.hide();
	}
}

function saveStatement(name, mbox, verb, file) {
	var statement = new TinCan.Statement({
		actor: {
			name: "",
			mbox: ""
		},
		verb: {
			id: ""
		},
		target: {
			id: ""
		}
	});

	statement.actor.name = name;
	statement.actor.mbox = 'mailto:' + mbox;
	statement.verb.id = verb;
	statement.target.id = file;

	lrs.saveStatement(
		statement, {
			callback: function (err, xhr) {
				if (err !== null) {
					if (xhr !== null) {
						console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
						return;
					}
					console.log("Failed to save statement: " + err);
					return;
				}
			}
		}
	);
	retrieveStatements();
}

function retrieveStatements() {
	lrs.queryStatements({
		params: {
			since: "2016-03-01T08:34:16Z"
		},
		callback: function (err, sr) {
			if (err !== null) {
				console.log("Failed to query statements: " + err);
				return;
			}
			if (sr.more !== null) {
				// additional pages of statements should be fetched
			}
		}
	});
}

function calculateScore() {

}

// set guide initial hash
window.onload = function() {
	var url = window.location.href,
		doc = url.lastIndexOf('/'),
		cutUrl = url.substring(doc+1);
	if ((cutUrl.indexOf('index.html')) !== -1) {
		window.location.hash = "guide_login";
	} else {
		window.location.hash = "guide_report";
	}
};

app.find('.startSession').on('click', function() {
	createUser();
	if (name !== '' && mbox !== '') {
		var thisView = $(this).closest('.view').data('this');
		var nextView = $(this).closest('.view').data('next');
		changeView(thisView, nextView);
		window.location.hash = "spam_musubis";
	}
	var file1 = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Food_Guide";
	saveStatement(name, mbox, 'https://brindlewaye.com/xAPITerms/verbs/loggedin', file1);
	var file2 = "http://summermichiko.github.io/tinCanTutorial/index.html#Spam_Musubis_Section";
	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/read', file2);
});

// app.find('.interactButton1').on('click', function() {
// 	$('.nextButton1').show();
// 	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Spam_Musubis_Activity";
// 	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/interact', file);
// });

app.find('.nextButton1').on('click', function() {
	var thisView = $(this).closest('.view').data('this');
	var nextView = $(this).closest('.view').data('next');
	changeView(thisView, nextView);
	window.location.hash = "poi";
	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Poi_Section";
	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/read', file);
});

// app.find('.interactButton2').on('click', function() {
// 	$('.nextButton2').show();
// 	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Fashion_Activity";
// 	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/interact', file);
// });

app.find('.nextButton2').on('click', function() {
	var thisView = $(this).closest('.view').data('this');
	var nextView = $(this).closest('.view').data('next');
	changeView(thisView, nextView);
	window.location.hash = "malasadas";
	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Malasada_Section";
	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/read', file);
});

// app.find('.interactButton3').on('click', function() {
// 	$('.nextButton3').show();
// 	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Language_Activity";
// 	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/interact', file);
// });

// start quiz
app.find('.nextButton3').on('click', function() {
	var thisView = $(this).closest('.view').data('this');
	var nextView = $(this).closest('.view').data('next');
	changeView(thisView, nextView);
	window.location.hash = "guide_quiz";
	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Food_Guide_Quiz";
	saveStatement(name, mbox, 'http://activitystrea.ms/schema/1.0/start', file);
});

// answer each question in quiz
app.find('.nextButton4').on('click', function() {
	var thisView = $(this).closest('.view').data('this');
	var nextView = $(this).closest('.view').data('next');
	if ($("input[name=q1]").is(":checked")) {
		$('.q1ErrorWrapper').hide();
	} else {
		$('.q1ErrorWrapper').show();
	}
	if ($("input[name=q2]").is(":checked")) {
		$('.q2ErrorWrapper').hide();
	} else {
		$('.q2ErrorWrapper').show();
	}
	if ($("input[name=q3]").is(":checked")) {
		$('.q3ErrorWrapper').hide();
	} else {
		$('.q3ErrorWrapper').show();
	}
	if ($("input[name=q1]").is(":checked") && $("input[name=q2]").is(":checked") && $("input[name=q3]").is(":checked")) {
		var q1Val = $("input[name=q1]:checked").val(),
			q2Val = $("input[name=q2]:checked").val(),
			q3Val = $("input[name=q3]:checked").val();

		if (q1Val === 'Japan') {
			score++;
		}
		if (q2Val === 'Roots') {
			score++;
		}
		if (q3Val === 'Carnivals') {
			score++;
		}
		if (score < 2) {
			comment = "Sorry, next time.";
		} else if (score === 2) {
			comment = "You're almost there!";
		} else if (score === 3) {
			comment = "Great job!";
		}

		var file1 = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Food_Guide_Quiz_Question1_with_'" + q1Val + "'";
		saveStatement(name, mbox, 'http://adlnet.gov/expapi/verbs/answered', file1);
		var file2 = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Food_Guide_Quiz_Question2_with_'" + q2Val + "'";
		saveStatement(name, mbox, 'http://adlnet.gov/expapi/verbs/answered', file2);
		var file3 = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Food_Guide_Quiz_Question3_with_'" + q3Val + "'";
		saveStatement(name, mbox, 'http://adlnet.gov/expapi/verbs/answered', file3);
		changeView(thisView, nextView);
		window.location.hash = "guide_completion";
		$('.completeText').text('You got ' + score + '/3 correct. ' + comment);
	}
});

// completed quiz
app.find('.nextButton5').on('click', function() {
	var file = "http://summermichiko.github.io/tinCanTutorial/index.html#Hawaii_Food_Guide";
	saveStatement(name, mbox, 'http://adlnet.gov/expapi/verbs/completed', file);
	$('#tinCanModal').modal({
		backdrop: 'static',
		keyboard: false
	});
});

