// You will also need to create a gmail filter to add the 'discord' label
// to any emails you want sent to discord

function sendEmailsToDiscord() {
    var label = GmailApp.getUserLabelByName('discord');
    var messages = [];
    var threads = label.getThreads();
  
    for (var i = 0; i < threads.length; i++) {
        messages = messages.concat(threads[i].getMessages())
    }

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        Logger.log(message);

        var output = '\n*New Email*';
        output += '\n*from:* ' + message.getFrom();
        //output += '\n*to:* ' + message.getTo();
        //output += '\n*cc:* ' + message.getCc();
        output += '\n*date:* ' + message.getDate();
        output += '\n*subject:* ' + message.getSubject();
        output += '\n*body:* ' + message.getPlainBody();
        Logger.log(output);

        var payload = {
            'username': 'Forum Updates Bot',
            'content': output,
        };

        var options = {
            'method' : 'post',
            'payload' : Utilities.jsonStringify(payload),
        };

        // replace this with your own Discord webhook URL
        // https://crowdscores.slack.com/services
        var webhookURL = '';
        if (message.getSubject() == "Office of Citizenship has a new topic"){webhookUrl = 'https://discordapp.com/api/webhooks/XXXXXX';}
        else{webhookUrl = 'https://discordapp.com/api/webhooks/XXXXXXXX';}
        UrlFetchApp.fetch(webhookUrl, options);
   }

   // remove the label from these threads so we don't send them to
   // slack again next time the script is run
   label.removeFromThreads(threads);
}