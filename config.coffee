exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/javascripts/createjs-2013.09.25.min.js',
          'vendor/javascripts/jquery-1.10.2.min.js',
          'javascripts/utils.js',
          'javascripts/collision/Quadtree.js',
          'javascripts/collision/Collision.js',
          'javascripts/collision/Hitbox.js',
          # base classes
          'javascripts/destructible.js',
          'javascripts/hull.js',
          'javascripts/GroundPiece.js',
          'javascripts/orbitaldefence.js',
            # actor
              'javascripts/actor/actor.js',
              'javascripts/actor/Player.js',
              'javascripts/actor/Enemy.js',
              'javascripts/actor/Swarm.js',
            # projectile
              'javascripts/projectile/projectile.js',
              'javascripts/projectile/missile.js',
            # weapon
              'javascripts/weapon/weapon.js',
              'javascripts/weapon/missilelauncher.js',
              'javascripts/weapon/cannon.js',
            # ui
              'javascripts/ui/hud.js',
          # content, subclasses
          'javascripts/basic-hull.js'
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'
