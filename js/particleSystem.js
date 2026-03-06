function ParticleSystem(context, spec) {
  let that = {};
  let explosionParticles = [];

  function create(spec) {
    let that = {};

    spec.fill = "rgb(255, 255, 255)";
    spec.stroke = "rgb(0, 0, 0)";
    spec.alive = 0;

    that.update = function (elapsedTime) {
      spec.center.x =
        spec.center.x + spec.speed * spec.direction.x * elapsedTime;
      spec.center.y =
        spec.center.y + spec.speed * spec.direction.y * elapsedTime;
      spec.alive = spec.alive + elapsedTime;

      spec.rotation = spec.rotation + spec.speed * 0.5;

      return spec.alive < spec.lifetime;
    };

    that.draw = function () {
      context.save();

      context.translate(spec.center.x, spec.center.y);
      context.rotate((spec.rotation * Math.PI) / 180);
      context.translate(-spec.center.x, -spec.center.y);

      context.drawImage(
        spec.image,
        spec.center.x,
        spec.center.y,
        spec.size.x,
        spec.size.y
      );

      context.restore();
    };

    return that;
  }

  that.updateExplosionParticles = function (elapsedTime) {
    let keepMe = [];
    for (let particle = 0; particle < explosionParticles.length; particle++) {
      if (explosionParticles[particle].update(elapsedTime)) {
        keepMe.push(explosionParticles[particle]);
      }
    }
    explosionParticles = keepMe;
  };

  that.addExplosionParticles = function (center) {
    for (let particle = 0; particle < 5; particle++) {
      let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
      let p = create({
        image: spec.image,
        center: { x: center.x, y: center.y },
        size: { x: size, y: size },
        rotation: 0,
        speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
        direction: Random.nextCircleVector(),
        lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),
      });
      explosionParticles.push(p);
    }
  };

  that.addSquareExplosionParticles = function (center, width) {
    for (let particle = 0; particle < Math.pow(width, 2); particle++) {
      let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
      if (particle % 2 == 0) {
        let p = create({
          image: spec.image,
          center: {
            x: center.x + (particle % width),
            y: center.y,
          },
          size: { x: size, y: size },
          rotation: 0,
          speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
          direction: Random.nextCircleVector(),
          lifetime: Random.nextGaussian(
            spec.lifetime.mean,
            spec.lifetime.stdev
          ),
        });
        explosionParticles.push(p);
      } else {
        let p = create({
          image: spec.image,
          center: {
            x: center.x,
            y: center.y + (particle % width),
          },
          size: { x: size, y: size },
          rotation: 0,
          speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
          direction: Random.nextCircleVector(),
          lifetime: Random.nextGaussian(
            spec.lifetime.mean,
            spec.lifetime.stdev
          ),
        });
        explosionParticles.push(p);
      }
    }
  };

  that.renderExplosion = function () {
    for (let p = explosionParticles.length - 1; p >= 0; p--) {
      explosionParticles[p].draw();
    }
  };

  return that;
}