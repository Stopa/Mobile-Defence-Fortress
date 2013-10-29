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
          'vendor/createjs-2013.09.25.min.js',
          'vendor/underscore.js',
          # primary files
          'app/javascripts/utils.js',
          'app/javascripts/collision/Quadtree.js',
          'app/javascripts/collision/Collision.js',
          # base classes
            'app/javascripts/destructible.js',
            'app/javascripts/hull.js',
            'app/javascripts/GroundPiece.js',
            'app/javascripts/orbitaldefence.js',
              # actor
                'app/javascripts/actor/actor.js',
                'app/javascripts/actor/Player.js',
                'app/javascripts/actor/Enemy.js',
                'app/javascripts/actor/Swarm.js',
              # projectile
                'app/javascripts/projectile/projectile.js',
                'app/javascripts/projectile/missile.js',
              # weapon
                'app/javascripts/weapon/weapon.js',
                'app/javascripts/weapon/missilelauncher.js',
                'app/javascripts/weapon/cannon.js',
              # ui
                'app/javascripts/ui/hud.js',
          # content, subclasses
            'app/javascripts/basic-hull.js',
          # game instance itself
            'app/javascripts/main.js'
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
