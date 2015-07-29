// You will also need to create a gmail filter to add the 'send-to-slack' label
// to any emails you want sent to slack

function sendEmailsToSlack() {
    var label = GmailApp.getUserLabelByName('send-to-slack');
    var messages = [];
    var threads = label.getThreads();
  
    for (var i = 0; i < threads.length; i++) {
        messages = messages.concat(threads[i].getMessages())
    }

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        Logger.log(message);

        var output = '*New Email*';
        output += '\n*from:* ' + message.getFrom();
        output += '\n*to:* ' + message.getTo();
        output += '\n*cc:* ' + message.getCc();
        output += '\n*date:* ' + message.getDate();
        output += '\n*subject:* ' + message.getSubject();
        output += '\n*body:* ' + message.getPlainBody();
        Logger.log(output);

        var payload = {
            'username': 'Monkeybot',
            'text': output,
            'channel' : '#some-channel',
            'icon_emoji': ':hear_no_evil:',
        };

        var options = {
            'method' : 'post',
            'payload' : Utilities.jsonStringify(payload),
        };

        // replace this with your own Slack webhook URL
        // https://crowdscores.slack.com/services
        var webhookUrl = 'https://hooks.slack.com/services/****/****/****';
        UrlFetchApp.fetch(webhookUrl, options);
   }

   // remove the label from these threads so we don't send them to
   // slack again next time the script is run
   label.removeFromThreads(threads);
}
