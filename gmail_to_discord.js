// You will also need to create a gmail filter to add the 'discord' label
// to any emails you want sent to discord
//Creating a front-end so less technically proficient users
//can just enter the labels they are using, the webhooks for the channels they need,
//and the bot name/picture/text and formatted message

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
        //For person use, the two lines below aren't immediately needed
        //output += '\n*to:* ' + message.getTo();
        //output += '\n*cc:* ' + message.getCc();
        output += '\n*date:* ' + message.getDate();
        output += '\n*subject:* ' + message.getSubject();
        output += '\n*body:* ' + message.getPlainBody();
        Logger.log(output);

        var payload = {
            //Text, channel, and icon emoji aren't supported by Discord
            //So content is the replacement for text, username remains the same
            //Channel is redundant as Discord webhooks are for individual channels
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
        //Expanding if/else to send messages to each channel for further categorization
        if (message.getSubject() == "Office of Citizenship has a new topic"){webhookUrl = 'https://discordapp.com/api/webhooks/XXXXXX';}
        else{webhookUrl = 'https://discordapp.com/api/webhooks/XXXXXXXX';}
        UrlFetchApp.fetch(webhookUrl, options);
   }

   // remove the label from these threads so we don't send them to
   // slack again next time the script is run
   label.removeFromThreads(threads);
}