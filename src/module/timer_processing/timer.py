import threading


class Timer(object):
  def __init__(self, interval, function, *args, **kwargs):
    self.interval = interval
    self.function = function
    self.args = args
    self.kwargs = kwargs
    self.timer = None
    self.is_running = False
    self.start()

  def _run(self):
    # print("//======= timer_run =======//")
    self.is_running = False
    self.start()
    self.function(*self.args, **self.kwargs)

  def start(self):
    # print("//======= timer_start =======//")
    if not self.is_running:
      self.timer = threading.Timer(self.interval, self._run)
      self.timer.start()
      self.is_running = True

  def stop(self):
    # print("//======= timer_stop =======//")
    if self.timer:
        self.timer.cancel()
    self.is_running = False
