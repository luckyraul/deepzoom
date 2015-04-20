var viewer = null;
i = 0;
function timedCount()
{
    switchTo(init, 'next');
    t = setTimeout("timedCount()", 6000);
}

function doTimer()
{
    if (timer_is_on)
    {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount()
{
    clearTimeout(t);
    timer_is_on = 0;
}
function switchTo(event, dzi) {
    if (dzi == 'next') {
        i++;
        if (i == max)
        {
            i = 0
        }
        viewer.openDzi(gallery[i]);
    }
    if (dzi == 'prev')
    {
        i--;
        if (i == -1)
        {
            i = maxx
        }
        viewer.openDzi(gallery[i]);
    }
    else {
        viewer.close();
    }
    Seadragon.Utils.cancelEvent(event);
}
function init() {
    viewer = new Seadragon.Viewer("gallery_container");
    viewer.openDzi(gallery[0]);
    doTimer();
}
Seadragon.Utils.addEvent(window, "load", init);